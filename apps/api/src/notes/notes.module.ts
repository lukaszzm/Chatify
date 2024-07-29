import { Module } from "@nestjs/common";

import { NotesResolver } from "@/notes/notes.resolver";
import { NotesService } from "@/notes/notes.service";
import { PrismaModule } from "@/prisma/prisma.module";
import { UsersModule } from "@/users/users.module";

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [NotesService, NotesResolver],
  exports: [NotesService],
})
export class NotesModule {}
