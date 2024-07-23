import { PrismaClient } from "@chatify/db";
import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo";
import { Module, UnauthorizedException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { CustomPrismaModule } from "nestjs-prisma";
import path from "path";

import { AuthModule } from "@/auth/auth.module";
import { AuthService } from "@/auth/auth.service";
import { ChatsModule } from "@/chats/chats.module";
import configuration, { validationSchema } from "@/config/configuration";
import { MessagesModule } from "@/messages/messages.module";
import { NotesModule } from "@/notes/notes.module";
import { UsersModule } from "@/users/users.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ChatsModule,
    MessagesModule,
    NotesModule,
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema,
    }),
    CustomPrismaModule.forRoot({
      name: "TurborepoPrisma",
      client: new PrismaClient(),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [AuthModule],
      driver: ApolloDriver,
      useFactory: async (authService: AuthService) => {
        return {
          introspection: true,
          playground: true,
          autoSchemaFile: path.join(process.cwd(), "src/schema.gql"),
          sortSchema: true,
          subscriptions: {
            "subscriptions-transport-ws": {
              onConnect: async (connectionParams) => {
                const authToken: string = connectionParams.authorization.split(" ")[1];

                if (!authToken) {
                  throw new UnauthorizedException("Missing auth token");
                }

                const user = await authService.getUserFromToken(authToken);

                if (!user) {
                  throw new UnauthorizedException("Invalid auth token");
                }

                return { connection: { user, headers: connectionParams } };
              },
            },
          },
        };
      },
      inject: [AuthService],
    }),
  ],
})
export class AppModule {}
