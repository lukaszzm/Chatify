import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { MessagesResolver } from "@/messages/messages.resolver";
import { MessagesService } from "@/messages/messages.service";
import { UsersService } from "@/users/users.service";

@Module({
  providers: [MessagesService, MessagesResolver, UsersService, PrismaService],
})
export class MessagesModule {}
