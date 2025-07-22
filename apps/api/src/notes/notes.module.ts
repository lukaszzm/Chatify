import { Module } from "@nestjs/common";

import { DrizzleModule } from "@/drizzle/drizzle.module";
import { NotesResolver } from "@/notes/notes.resolver";
import { NotesService } from "@/notes/notes.service";
import { UsersModule } from "@/users/users.module";

@Module({
  imports: [DrizzleModule, UsersModule],
  providers: [NotesService, NotesResolver],
  exports: [NotesService],
})
export class NotesModule {}
