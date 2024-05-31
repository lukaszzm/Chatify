import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { UsersService } from "@/users/users.service";
import { UsersResolver } from "@/users/users.resolver";

@Module({
  providers: [UsersService, PrismaService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
