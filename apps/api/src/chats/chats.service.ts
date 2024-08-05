import { Injectable } from "@nestjs/common";

import { StartChatInput } from "@/chats/dtos/start-chat.input";
import { PaginationArgs } from "@/common/dtos/pagination.args";
import { removeDuplicates } from "@/common/utils";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class ChatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneById(id: string, userId: string) {
    return this.prismaService.chat.findUnique({
      where: {
        id,
        participants: {
          some: {
            userId,
          },
        },
      },
    });
  }

  async findManyByUserId(userId: string, pagination: PaginationArgs) {
    const take = pagination.first ? pagination.first + 1 : undefined;

    const results = await this.prismaService.chat.findMany({
      take: take,
      skip: pagination.after ? 1 : 0,
      cursor: pagination.after ? { lastMessageAt: pagination.after } : undefined,
      where: {
        participants: {
          some: {
            userId,
          },
        },
        lastMessageAt: {
          not: null,
        },
      },
      orderBy: {
        lastMessageAt: "desc",
      },
    });

    const edges = results.slice(0, pagination.first);

    const pageInfo = {
      hasNextPage: results.length === take,
      endCursor: edges[edges.length - 1]?.lastMessageAt?.toISOString(),
    };

    return {
      edges,
      pageInfo,
    };
  }

  async create(data: StartChatInput) {
    const uniqueParticipants = removeDuplicates(data.participants);

    return this.prismaService.chat.create({
      data: {
        type: "ONE_TO_ONE",
        participants: {
          createMany: {
            data: uniqueParticipants.map((userId) => ({
              userId,
            })),
          },
        },
      },
    });
  }

  async createIfNotExists(data: StartChatInput) {
    const existingChat = await this.prismaService.chat.findFirst({
      where: {
        participants: {
          every: {
            userId: {
              in: data.participants,
            },
          },
        },
        type: "ONE_TO_ONE",
      },
    });

    if (existingChat) {
      return existingChat;
    }

    return this.create(data);
  }
}
