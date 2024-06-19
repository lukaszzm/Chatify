import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class MessagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(chatId: string) {
    return this.prismaService.message.findMany({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findLast(chatId: string) {
    return this.prismaService.message.findFirst({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
