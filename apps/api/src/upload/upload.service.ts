import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileUpload } from "graphql-upload-ts";
import sharp from "sharp";
import { Readable } from "stream";

import { Ratio } from "@/common/enums/ratio";
import {
  CHROMA_SUBSAMPLING,
  IMAGE_SIZE,
  MAX_WIDTH,
  QUALITY_ARRAY,
} from "@/upload/upload.constants";

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

  private async compressImageStream(
    inputStream: Readable,
    ratio?: number
  ): Promise<Buffer> {
    let transformer = sharp();

    try {
      if (ratio) {
        transformer = transformer.resize({
          width: MAX_WIDTH,
          height: Math.round(MAX_WIDTH * ratio),
          fit: sharp.fit.cover,
        });
      }

      const processedBuffer = await inputStream
        .pipe(transformer)
        .jpeg({
          mozjpeg: true,
          chromaSubsampling: CHROMA_SUBSAMPLING,
        })
        .toBuffer();

      if (processedBuffer.length <= IMAGE_SIZE) {
        return processedBuffer;
      }

      let bestBuffer = processedBuffer;

      for (const quality of QUALITY_ARRAY) {
        let qualityTransformer: sharp.Sharp | null = null;

        try {
          qualityTransformer = sharp(processedBuffer).jpeg({
            quality,
            chromaSubsampling: CHROMA_SUBSAMPLING,
          });

          const qualityBuffer = await qualityTransformer.toBuffer();

          if (qualityBuffer.length <= IMAGE_SIZE || quality === 10) {
            return qualityBuffer;
          }

          if (qualityBuffer.length < bestBuffer.length) {
            bestBuffer = qualityBuffer;
          }
        } finally {
          if (qualityTransformer) {
            qualityTransformer.destroy();
          }
        }
      }

      return bestBuffer;
    } catch (error) {
      transformer.destroy();
      throw error;
    }
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
    const sanitizedFilename = file.filename.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fixedFileName = `${timestamp}-${sanitizedFilename}`;

    let inputStream: Readable | null = null;

    try {
      inputStream = file.createReadStream();

      inputStream.on("error", (error) => {
        throw new InternalServerErrorException(`Stream error: ${error.message}`);
      });

      const compressedBuffer = await this.compressImageStream(inputStream, ratio);
      return await this.uploadToS3(fixedFileName, compressedBuffer);
    } finally {
      if (inputStream && !inputStream.destroyed) {
        inputStream.destroy();
      }
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
