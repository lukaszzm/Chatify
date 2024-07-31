import { Injectable } from "@nestjs/common";

import { StartChatInput } from "@/chats/dtos/start-chat.input";
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

  async findManyByUserId(userId: string) {
    return this.prismaService.chat.findMany({
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
