import { Module } from "@nestjs/common";

import { NotesResolver } from "@/notes/notes.resolver";
import { NotesService } from "@/notes/notes.service";
import { UsersModule } from "@/users/users.module";

@Module({
  imports: [UsersModule],
  providers: [NotesService, NotesResolver],
  exports: [NotesService],
})
export class NotesModule {}
