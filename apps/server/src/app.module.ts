import { Module } from "@nestjs/common";
import { NotesModule } from "./notes/notes.module";
import { UsersModule } from "./users/users.module";
import { MessagesModule } from "./messages/messages.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1938",
      database: "chatify-db",
      autoLoadEntities: true,
      synchronize: true,
    }),
    NotesModule,
    UsersModule,
    MessagesModule,
  ],
})
export class AppModule {}
