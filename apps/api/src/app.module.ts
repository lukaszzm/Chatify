import { PrismaClient } from "@chatify/db";
import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { CustomPrismaModule } from "nestjs-prisma";
import path from "path";

import { AuthModule } from "@/auth/auth.module";
import { ChatsModule } from "@/chats/chats.module";
import configuration, { validationSchema } from "@/config/configuration";
import { MessagesModule } from "@/messages/messages.module";
import { UsersModule } from "@/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema,
    }),
    CustomPrismaModule.forRoot({
      name: "TurborepoPrisma",
      client: new PrismaClient(),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
    }),
    AuthModule,
    UsersModule,
    ChatsModule,
    MessagesModule,
  ],
})
export class AppModule {}
