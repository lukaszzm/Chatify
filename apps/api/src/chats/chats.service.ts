import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { StartChatInput } from "@/chats/dtos/start-chat.input";
import { PaginationArgs } from "@/common/dtos/pagination.args";
import { paginate } from "@/common/utils/paginate";
import { removeDuplicates } from "@/common/utils/remove-duplicates";

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

  findManyByUserId(_userId: string, _pagination: PaginationArgs) {
    return paginate();
  }

  async create(data: StartChatInput) {
    const uniqueParticipants = removeDuplicates(data.participants);

    if (uniqueParticipants.length !== 2) {
      throw new BadRequestException("Chat requires exactly 2 participants");
    }

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
