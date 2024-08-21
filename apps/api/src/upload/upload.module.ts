import { Module } from "@nestjs/common";

import { UploadResolver } from "@/upload/upload.resolver";
import { UploadService } from "@/upload/upload.service";

@Module({
  imports: [],
  providers: [UploadService, UploadResolver],
})
export class UploadModule {}
