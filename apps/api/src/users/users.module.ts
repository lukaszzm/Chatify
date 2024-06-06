import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { UsersResolver } from "@/users/users.resolver";
import { UsersService } from "@/users/users.service";

@Module({
  providers: [UsersService, PrismaService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
