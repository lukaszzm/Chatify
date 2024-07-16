import { Module } from "@nestjs/common";

import { ChatsResolver } from "@/chats/chats.resolver";
import { ChatsService } from "@/chats/chats.service";

@Module({
  providers: [ChatsResolver, ChatsService],
})
export class ChatsModule {}
