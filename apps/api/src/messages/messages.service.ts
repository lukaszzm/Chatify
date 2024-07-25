import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { SendMessageInput } from "@/messages/dtos/send-message.input";

@Injectable()
export class MessagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByChatId(chatId: string) {
    return this.prismaService.message.findMany({
      where: {
        chatId,
      },
    });
  }

  async findManyByUserId(userId: string) {
    return this.prismaService.message.findMany({
      where: {
        senderId: userId,
      },
    });
  }

  async findLatestByChatId(chatId: string) {
    return this.prismaService.message.findFirst({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(data: SendMessageInput, senderId: string) {
    return this.prismaService.message.create({
      data: {
        content: data.content,
        chat: {
          connect: {
            id: data.chatId,
          },
        },
        sender: {
          connect: {
            id: senderId,
          },
        },
      },
    });
  }
}
