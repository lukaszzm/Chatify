import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class ChatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneById(chatId: string, userId: string) {
    const chat = await this.prismaService.chat.findFirst({
      where: {
        id: chatId,
      },
      include: {
        participants: true,
      },
    });

    if (!chat) {
      throw new NotFoundException();
    }

    const isUserInChat = chat.participants.some(({ userId: id }) => id === userId);

    if (!isUserInChat) {
      throw new UnauthorizedException();
    }

    return chat;
  }

  async findMany(userId: string) {
    return this.prismaService.chat.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
    });
  }
}
