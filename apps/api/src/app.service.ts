import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return "Hello from Nest.JS!";
  }

  getUser(): Promise<User | null> {
    return this.prisma.user.findFirst();
  }
}
