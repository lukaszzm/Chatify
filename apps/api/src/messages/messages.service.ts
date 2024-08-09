import { Injectable } from "@nestjs/common";

import { PaginationArgs } from "@/common/dtos/pagination.args";
import { SendMessageInput } from "@/messages/dtos/send-message.input";
import { PrismaService } from "@/prisma/prisma.service";

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
    const take = pagination.first ? pagination.first + 1 : undefined;

    const results = await this.prismaService.message.findMany({
      take: take,
      skip: pagination.after ? 1 : 0,
      cursor: pagination.after ? { createdAt: new Date(pagination.after) } : undefined,
      where: {
        chatId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const nodes = results.slice(0, pagination.first);

    const pageInfo = {
      hasNextPage: results.length === take,
      endCursor: nodes[nodes.length - 1]?.createdAt?.toISOString(),
    };

    return {
      edges: nodes.map((node) => ({ cursor: node.createdAt.toISOString(), node })),
      pageInfo,
    };
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
