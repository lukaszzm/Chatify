import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { ChatsPreviewResolver } from "@/chats/chats-preview.resolver";
import { ChatsResolver } from "@/chats/chats.resolver";
import { ChatsService } from "@/chats/chats.service";
import { MessagesService } from "@/messages/messages.service";
import { UsersService } from "@/users/users.service";

@Module({
  providers: [
    ChatsResolver,
    ChatsPreviewResolver,
    ChatsService,
    PrismaService,
    UsersService,
    MessagesService,
  ],
})
export class ChatsModule {}
