import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo";
import { Module, UnauthorizedException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { PrismaModule } from "nestjs-prisma";
import path from "path";

import { AuthModule } from "@/auth/auth.module";
import { AuthService } from "@/auth/auth.service";
import { ChatsModule } from "@/chats/chats.module";
import configuration, { validationSchema } from "@/config/configuration";
import { MessagesModule } from "@/messages/messages.module";
import { NotesModule } from "@/notes/notes.module";
import { PubSubModule } from "@/pubsub/pubsub.module";
import { UploadModule } from "@/upload/upload.module";
import { UsersModule } from "@/users/users.module";

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    PubSubModule,
    AuthModule,
    UploadModule,
    UsersModule,
    ChatsModule,
    MessagesModule,
    NotesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
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
            "graphql-ws": {
              path: "/graphql",
              onConnect: async (context) => {
                const authHeader = context.connectionParams?.authorization;

                if (typeof authHeader !== "string") {
                  throw new UnauthorizedException("Missing auth token");
                }

                const authToken = authHeader.split(" ")[1];

                const user = await authService.getUserFromToken(authToken);

                if (!user) {
                  throw new UnauthorizedException("Invalid auth token");
                }

                context.extra = { user, headers: context.connectionParams };
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
