import { forwardRef, Module } from "@nestjs/common";

import { ChatsModule } from "@/chats/chats.module";
import { DrizzleModule } from "@/drizzle/drizzle.module";
import { MessagesResolver } from "@/messages/messages.resolver";
import { MessagesService } from "@/messages/messages.service";
import { PubSubModule } from "@/pubsub/pubsub.module";
import { UsersModule } from "@/users/users.module";

@Module({
  imports: [DrizzleModule, UsersModule, PubSubModule, forwardRef(() => ChatsModule)],
  providers: [MessagesService, MessagesResolver],
  exports: [MessagesService],
})
export class MessagesModule {}
