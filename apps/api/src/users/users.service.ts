import { Prisma } from "@chatify/db";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";

import { PasswordService } from "@/auth/password.service";
import { PrismaService } from "@/prisma/prisma.service";
import { UpdatePasswordInput } from "@/users/dtos/update-password.input";
import { UpdateProfileInput } from "@/users/dtos/update-profile.input";
import { UsersArgs } from "@/users/dtos/users.args";

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService
  ) {}

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
        fullName: { contains: args.where?.fullName, mode: "insensitive" },
        firstName: { contains: args.where?.firstName, mode: "insensitive" },
        lastName: { contains: args.where?.lastName, mode: "insensitive" },
        email: { contains: args.where?.email, mode: "insensitive" },
      },
      take: args.pagination?.take,
      skip: args.pagination?.skip,
      orderBy: {
        createdAt: args.order,
      },
    });
  }

  async findManyByChatId(chatId: string) {
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

  async create(data: Omit<Prisma.UserCreateInput, "fullName">) {
    return this.prismaService.user.create({
      data: {
        ...data,
        fullName: `${data.firstName} ${data.lastName}`,
      },
    });
  }

  async update(data: UpdateProfileInput, id: string) {
    return this.prismaService.user.update({
      where: { id },
      data: {
        ...data,
        fullName: `${data.firstName} ${data.lastName}`,
      },
    });
  }

  async updatePassword(data: UpdatePasswordInput, id: string) {
    if (data.newPassword !== data.confirmPassword) {
      throw new BadRequestException("Passwords do not match");
    }

    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const isPasswordValid = await this.passwordService.verify(
      user.password,
      data.currentPassword
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Incorrect current password");
    }

    const hashedPassword = await this.passwordService.hash(data.newPassword);

    return this.prismaService.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });
  }

  async delete(id: string) {
    const [, deletedUser] = await this.prismaService.$transaction([
      this.prismaService.chat.deleteMany({
        where: {
          participants: {
            some: {
              userId: id,
            },
          },
        },
      }),
      this.prismaService.user.delete({
        where: { id },
      }),
    ]);

    return deletedUser;
  }
}
