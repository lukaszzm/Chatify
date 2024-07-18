import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { ChatsResolver } from "@/chats/chats.resolver";
import { ChatsService } from "@/chats/chats.service";

@Module({
  providers: [ChatsResolver, ChatsService, PrismaService],
})
export class ChatsModule {}
