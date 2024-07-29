import { forwardRef, Module } from "@nestjs/common";

import { ChatsModule } from "@/chats/chats.module";
import { MessagesResolver } from "@/messages/messages.resolver";
import { MessagesService } from "@/messages/messages.service";
import { PrismaModule } from "@/prisma/prisma.module";
import { PubSubModule } from "@/pubsub/pubsub.module";
import { UsersModule } from "@/users/users.module";

@Module({
  imports: [UsersModule, PrismaModule, PubSubModule, forwardRef(() => ChatsModule)],
  providers: [MessagesService, MessagesResolver],
  exports: [MessagesService],
})
export class MessagesModule {}
