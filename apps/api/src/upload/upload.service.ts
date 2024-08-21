import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
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

  private validateImage(mimetype: string): boolean {
    const type = mimetype.split("/")[0];
    return type === "image";
  }

  private async streamToBuffer(stream: Readable): Promise<Buffer> {
    const buffer: Uint8Array[] = [];

    return new Promise((resolve, reject) => {
      stream.on("data", (data) => buffer.push(data));
      stream.on("end", () => resolve(Buffer.concat(buffer)));
      stream.on("error", (error) => reject(error));
    });
  }

  private async compressImage(buffer: Buffer, ratio?: number): Promise<Buffer> {
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
      for (let i = 0; i < QUALITY_ARRAY.length; i++) {
        const quality = QUALITY_ARRAY[i];
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

  private async uploadToS3(filename: string, buffer: Buffer): Promise<string> {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow<string>("AWS_S3_BUCKET_NAME"),
        Key: filename,
        Body: buffer,
      })
    );

    const url = `https://${this.s3Bucket}.s3.${this.s3Region}.amazonaws.com/${filename}`;
    return url;
  }

  async uploadImage(file: FileUpload, ratio?: Ratio): Promise<string> {
    const { mimetype, filename, createReadStream } = file;

    if (!this.validateImage(mimetype)) {
      throw new BadRequestException("Invalid file type, only images are allowed");
    }

    try {
      const buffer = await this.streamToBuffer(createReadStream());
      const compressedBuffer = await this.compressImage(buffer, ratio);
      return await this.uploadToS3(filename, compressedBuffer);
    } catch (error) {
      throw new InternalServerErrorException("Failed to upload image");
    }
  }
}
