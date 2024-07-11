import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { UsersArgs } from "@/users/dtos/users.args";

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

  async findMany(args: UsersArgs) {
    return this.prismaService.user.findMany({
      where: {
        ...args.where,
        firstName: { contains: args.where?.firstName },
        lastName: { contains: args.where?.lastName },
        fullName: { contains: args.where?.fullName },
        email: { contains: args.where?.email },
      },
      orderBy: {
        createdAt: args.order,
      },
      take: args.pagination?.take,
      skip: args.pagination?.skip,
    });
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
      data: {
        ...data,
        fullName: `${data.firstName} ${data.lastName}`,
      },
    });
  }
}
