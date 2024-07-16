import { Module } from "@nestjs/common";

import { MessagesResolver } from "@/messages/messages.resolver";
import { MessagesService } from "@/messages/messages.service";

@Module({
  providers: [MessagesService, MessagesResolver],
})
export class MessagesModule {}
