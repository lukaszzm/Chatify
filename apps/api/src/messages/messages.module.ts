import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { MessagesService } from "@/messages/messages.service";

@Module({
  providers: [MessagesService, PrismaService],
})
export class MessagesModule {}
