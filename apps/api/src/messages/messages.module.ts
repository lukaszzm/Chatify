import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { MessagesResolver } from "@/messages/messages.resolver";
import { MessagesService } from "@/messages/messages.service";

@Module({
  providers: [MessagesService, MessagesResolver, PrismaService],
})
export class MessagesModule {}
