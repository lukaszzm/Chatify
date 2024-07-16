import { Resolver } from "@nestjs/graphql";

import { Chat } from "@/chats/models/chat.model";

@Resolver(() => Chat)
export class ChatsResolver {
  constructor() {}
}
