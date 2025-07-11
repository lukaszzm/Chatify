import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileUpload } from "graphql-upload-ts";
import sharp, { Sharp } from "sharp";
import { Readable } from "stream";

import { Ratio } from "@/common/enums/ratio";
import { IMAGE_SIZE, MAX_WIDTH, QUALITY_ARRAY } from "@/upload/upload.constants";

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;
  private readonly s3Bucket: string;
  private readonly s3Region: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Bucket = this.configService.getOrThrow<string>("AWS_S3_BUCKET_NAME");
    this.s3Region = this.configService.getOrThrow<string>("AWS_S3_REGION");

    this.s3Client = new S3Client({
      region: this.configService.getOrThrow<string>("AWS_S3_REGION"),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>("AWS_ACCESS_KEY"),
        secretAccessKey: this.configService.getOrThrow<string>("AWS_SECRET_ACCESS_KEY"),
      },
    });
  }

  private validateImage(mimetype: string) {
    const type = mimetype.split("/")[0];
    return type === "image";
  }

  private async streamToBuffer(stream: Readable) {
    const buffer: Uint8Array[] = [];

    return new Promise((resolve, reject) => {
      stream.on("data", (data: Uint8Array) => buffer.push(data));
      stream.on("end", () => {
        resolve(Buffer.concat(buffer));
      });
      stream.on("error", (error) => {
        reject(error);
      });
    }) satisfies Promise<Buffer>;
  }

  private async compressImage(buffer: Buffer, ratio?: number) {
    let compressBuffer: Sharp | Buffer = sharp(buffer).jpeg({
      mozjpeg: true,
      chromaSubsampling: "4:4:4",
    });

    if (ratio) {
      compressBuffer.resize({
        width: MAX_WIDTH,
        height: Math.round(MAX_WIDTH * ratio),
        fit: "cover",
      });
    }

    compressBuffer = await compressBuffer.toBuffer();

    if (compressBuffer.length > IMAGE_SIZE) {
      for (const quality of QUALITY_ARRAY) {
        const smallerBuffer = await sharp(compressBuffer)
          .jpeg({
            quality,
            chromaSubsampling: "4:4:4",
          })
          .toBuffer();

        if (smallerBuffer.length <= IMAGE_SIZE || quality === 10) {
          compressBuffer = smallerBuffer;
          break;
        }
      }
    }

    return compressBuffer;
  }

  private createFileUrl(filename: string) {
    return `https://${this.s3Bucket}.s3.${this.s3Region}.amazonaws.com/${filename}`;
  }

  private extractFilename(url: string) {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 1];
  }

  private async uploadToS3(filename: string, buffer: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow<string>("AWS_S3_BUCKET_NAME"),
        Key: filename,
        Body: buffer,
      })
    );

    return this.createFileUrl(filename);
  }

  private async deleteFromS3(filename: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.configService.getOrThrow<string>("AWS_S3_BUCKET_NAME"),
        Key: filename,
      })
    );
  }

  async uploadImage(file: FileUpload, ratio?: Ratio) {
    if (!this.validateImage(file.mimetype)) {
      throw new BadRequestException("Invalid file type, only images are allowed");
    }

    const timestamp = Date.now().toString();
    const fixedFileName = `${timestamp}-${file.filename}`;

    try {
      const buffer = await this.streamToBuffer(file.createReadStream());
      const compressedBuffer = await this.compressImage(buffer, ratio);
      return await this.uploadToS3(fixedFileName, compressedBuffer);
    } catch {
      throw new InternalServerErrorException("Failed to upload image");
    }
  }

  async deleteImage(url: string) {
    const filename = this.extractFilename(url);

    try {
      await this.deleteFromS3(filename);
    } catch {
      throw new InternalServerErrorException("Failed to delete image");
    }
  }
}
