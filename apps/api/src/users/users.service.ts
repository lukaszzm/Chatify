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
}
