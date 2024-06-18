import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findOneById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findMany() {
    return this.prismaService.user.findMany();
  }

  async findManyByChat(chatId: string) {
    return this.prismaService.user.findMany({
      where: {
        chats: {
          some: {
            chatId,
          },
        },
      },
    });
  }

  async create(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    return this.prismaService.user.create({
      data,
    });
  }
}
