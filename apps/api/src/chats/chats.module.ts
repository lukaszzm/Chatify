import { Module } from "@nestjs/common";

import { ChatsPreviewResolver } from "@/chats/chats-preview.resolver";
import { ChatsResolver } from "@/chats/chats.resolver";
import { ChatsService } from "@/chats/chats.service";
import { MessagesModule } from "@/messages/messages.module";
import { PrismaModule } from "@/prisma/prisma.module";
import { PubSubModule } from "@/pubsub/pubsub.module";
import { UsersModule } from "@/users/users.module";

@Module({
  imports: [PrismaModule, PubSubModule, UsersModule, MessagesModule],
  providers: [ChatsService, ChatsResolver, ChatsPreviewResolver],
  exports: [ChatsService],
})
export class ChatsModule {}
