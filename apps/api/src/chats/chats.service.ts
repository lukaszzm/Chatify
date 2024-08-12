import { Injectable } from "@nestjs/common";

import { StartChatInput } from "@/chats/dtos/start-chat.input";
import { PaginationArgs } from "@/common/dtos/pagination.args";
import { paginate } from "@/common/utils/paginate";
import { removeDuplicates } from "@/common/utils/remove-duplicates";
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
    return paginate({
      client: this.prismaService,
      model: "Chat",
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
      cursorColumn: "lastMessageAt",
      pagination,
    });
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
