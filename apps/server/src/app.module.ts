import { Module } from "@nestjs/common";
import { NotesModule } from "./notes/notes.module";
import { UsersModule } from "./users/users.module";
import { MessagesModule } from "./messages/messages.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";

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
    AuthModule,
  ],
})
export class AppModule {}
