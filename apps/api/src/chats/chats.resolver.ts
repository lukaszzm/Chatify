import type { User } from "@chatify/db";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "@/auth/guards/gql-auth.guard";
import { ChatsService } from "@/chats/chats.service";
import { StartChatInput } from "@/chats/dtos/start-chat.input";
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
  @Query(() => Chat, {
    nullable: true,
    description: "Get chat by ID, authenticated user must be a participant",
  })
  async chat(@Args("id") id: string, @CurrentUser() user: User) {
    return this.chatsService.findOneById(id, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Chat!, {
    nullable: false,
    description: "Start a new chat with the given participants, if it doesn't exist yet",
  })
  async startChat(@Args("data") data: StartChatInput, @CurrentUser() user: User) {
    return this.chatsService.createIfNotExists({
      ...data,
      participants: [user.id, ...data.participants],
    });
  }

  @ResolveField()
  async participants(@Parent() chat: Chat) {
    return this.usersService.findManyByChatId(chat.id);
  }

  @ResolveField()
  async messages(@Parent() chat: Chat) {
    return this.messagesService.findManyByChatId(chat.id);
  }
}
