import type { User } from "@chatify/db";
import { UseGuards } from "@nestjs/common";
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "@/auth/guards/gql-auth.guard";
import { ChatsService } from "@/chats/chats.service";
import { Chat } from "@/chats/models/chat.model";
import { MessagesService } from "@/messages/messages.service";
import { UsersService } from "@/users/users.service";

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Chat)
  async chat(@Args("id", { type: () => String }) id: string, @CurrentUser() me: User) {
    return this.chatsService.findOneById(id, me.id);
  }

  @ResolveField()
  async participants(@Parent() chat: Chat) {
    return this.usersService.findManyByChat(chat.id);
  }

  @ResolveField()
  async messages(@Parent() chat: Chat) {
    return this.messagesService.findManyByChat(chat.id);
  }
}
