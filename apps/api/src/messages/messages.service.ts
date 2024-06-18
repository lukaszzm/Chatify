import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class MessagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByChat(chatId: string) {
    return this.prismaService.message.findMany({
      where: {
        chat: {
          id: chatId,
        },
      },
    });
  }
}
