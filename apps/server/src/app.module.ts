import { Module } from "@nestjs/common";
import { NotesModule } from "./notes/notes.module";
import { UsersModule } from "./users/users.module";
import { MessagesModule } from "./messages/messages.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NotesModule,
    UsersModule,
    MessagesModule,
    AuthModule,
    EventsModule,
  ],
})
export class AppModule {}
