import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

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
}
