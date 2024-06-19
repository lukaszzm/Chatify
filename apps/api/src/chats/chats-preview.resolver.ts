import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "@/auth/guards/gql-auth.guard";
import { ChatsService } from "@/chats/chats.service";
import { ChatPreview } from "@/chats/models/chat-preview.model";
import { MessagesService } from "@/messages/messages.service";
import { User } from "@/users/models/user.model";
import { UsersService } from "@/users/users.service";

@Resolver(() => ChatPreview)
export class ChatsPreviewResolver {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [ChatPreview]!)
  async recentChats(@CurrentUser() me: User) {
    return this.chatsService.findMany(me.id);
  }

  @ResolveField()
  async participants(@Parent() chat: ChatPreview) {
    return this.usersService.findManyByChat(chat.id);
  }

  @ResolveField()
  async recentMessage(@Parent() chat: ChatPreview) {
    return this.messagesService.findLast(chat.id);
  }
}
