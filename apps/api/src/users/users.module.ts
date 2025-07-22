import { forwardRef, Module } from "@nestjs/common";

import { AuthModule } from "@/auth/auth.module";
import { DrizzleModule } from "@/drizzle/drizzle.module";
import { UploadModule } from "@/upload/upload.module";
import { UsersResolver } from "@/users/users.resolver";
import { UsersService } from "@/users/users.service";

@Module({
  imports: [DrizzleModule, UploadModule, forwardRef(() => AuthModule)],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
