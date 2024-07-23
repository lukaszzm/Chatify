import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { ChatsService } from "@/chats/chats.service";
import { MessagesResolver } from "@/messages/messages.resolver";
import { MessagesService } from "@/messages/messages.service";
import { UsersService } from "@/users/users.service";

@Module({
  providers: [
    MessagesService,
    MessagesResolver,
    PrismaService,
    UsersService,
    ChatsService,
  ],
})
export class MessagesModule {}
