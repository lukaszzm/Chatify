import type { User } from "@chatify/db";
import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "@/auth/guards/gql-auth.guard";
import { ChatsService } from "@/chats/chats.service";
import { ChatPreview } from "@/chats/models/chat-preview.model";
import { Chat } from "@/chats/models/chat.model";
import { MessagesService } from "@/messages/messages.service";
import { UsersService } from "@/users/users.service";

@Resolver(() => ChatPreview)
export class ChatsPreviewResolver {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [ChatPreview])
  async recentChats(@CurrentUser() user: User) {
    return this.chatsService.findManyByUserId(user.id);
  }

  @ResolveField()
  async participants(@Parent() chat: Chat) {
    return this.usersService.findManyByChatId(chat.id);
  }

  @ResolveField()
  async latestMessage(@Parent() chatPreview: ChatPreview) {
    return this.messagesService.findLatestByChatId(chatPreview.id);
  }
}
