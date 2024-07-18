import type { User } from "@chatify/db";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "@/auth/guards/gql-auth.guard";
import { ChatsService } from "@/chats/chats.service";
import { StartChatInput } from "@/chats/dtos/start-chat.input";
import { Chat } from "@/chats/models/chat.model";

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Chat!)
  async startChat(@Args("data") data: StartChatInput, @CurrentUser() user: User) {
    return this.chatsService.createIfNotExists({
      ...data,
      participants: [user.id, ...data.participants],
    });
  }
}
