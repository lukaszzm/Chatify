import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { NotesResolver } from "@/notes/notes.resolver";
import { NotesService } from "@/notes/notes.service";
import { UsersService } from "@/users/users.service";

@Module({
  providers: [NotesResolver, NotesService, PrismaService, UsersService],
})
export class NotesModule {}
