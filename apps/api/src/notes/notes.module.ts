import { Module } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { NotesResolver } from "@/notes/notes.resolver";
import { NotesService } from "@/notes/notes.service";

@Module({
  providers: [NotesResolver, NotesService, PrismaService],
})
export class NotesModule {}
