import { Prisma } from "@chatify/db";
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

  async findMany(args: UsersArgs, userId: string) {
    const idFilter = args.excludeMe ? { not: userId } : undefined;

    return this.prismaService.user.findMany({
      where: {
        id: idFilter,
        fullName: { contains: args.where?.fullName },
        firstName: { contains: args.where?.firstName },
        lastName: { contains: args.where?.lastName },
        email: { contains: args.where?.email },
      },
      take: args.pagination?.take,
      skip: args.pagination?.skip,
      orderBy: {
        createdAt: args.order,
      },
    });
  }

  async create(data: Omit<Prisma.UserCreateInput, "fullName">) {
    return this.prismaService.user.create({
      data: {
        ...data,
        fullName: `${data.firstName} ${data.lastName}`,
      },
    });
  }
}
