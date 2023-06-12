import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow("AWS_S3_REGION"),
    });
    this.bucket = this.configService.getOrThrow("AWS_BUCKET_NAME");
  }

  async upload(fileName: string, file: Buffer) {
    return await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
        Body: file,
      }),
    );
  }
}
