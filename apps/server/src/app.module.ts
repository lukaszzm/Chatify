import { Module } from "@nestjs/common";
import { NotesModule } from "./notes/notes.module";
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [NotesModule, UsersModule, MessagesModule],
})
export class AppModule {}
