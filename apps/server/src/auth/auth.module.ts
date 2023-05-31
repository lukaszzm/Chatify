import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { NestjsFormDataModule } from "nestjs-form-data";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [NestjsFormDataModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
