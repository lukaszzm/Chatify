import { forwardRef, Module } from "@nestjs/common";

import { AuthModule } from "@/auth/auth.module";
import { UploadModule } from "@/upload/upload.module";
import { UsersResolver } from "@/users/users.resolver";
import { UsersService } from "@/users/users.service";

@Module({
  imports: [UploadModule, forwardRef(() => AuthModule)],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
