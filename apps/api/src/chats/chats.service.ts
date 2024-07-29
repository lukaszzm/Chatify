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
      },
      orderBy: {
        lastMessageAt: "desc",
      },
    });
  }

  async create(data: StartChatInput) {
    const uniqueParticipants = removeDuplicates(data.participants);

    return this.prismaService.$transaction(async (tx) => {
      const newChat = await tx.chat.create({
        data: {
          title: data.title,
        },
      });

      await tx.participant.createMany({
        data: uniqueParticipants.map((userId) => ({
          chatId: newChat.id,
          userId,
        })),
      });

      return newChat;
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
      },
    });

    if (existingChat) {
      return existingChat;
    }

    return this.create(data);
  }
}
