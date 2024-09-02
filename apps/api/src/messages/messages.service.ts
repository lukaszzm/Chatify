import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { PaginationArgs } from "@/common/dtos/pagination.args";
import { paginate } from "@/common/utils/paginate";
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

  async findManyByChatIdWithPagination(chatId: string, pagination: PaginationArgs) {
    return paginate({
      client: this.prismaService,
      model: "Message",
      where: {
        chatId,
      },
      pagination,
      cursorColumn: "createdAt",
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
    return this.prismaService.$transaction(async (tx) => {
      const message = await tx.message.create({
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

      await tx.chat.update({
        where: {
          id: data.chatId,
        },
        data: {
          lastMessageAt: message.createdAt,
        },
      });

      return message;
    });
  }
}
