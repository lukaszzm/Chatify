import type { User } from "@chatify/db";
import { UseGuards } from "@nestjs/common";
import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from "@nestjs/graphql";

import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "@/auth/guards/gql-auth.guard";
import { ChatsService } from "@/chats/chats.service";
import { ChatPreview } from "@/chats/models/chat-preview.model";
import { Chat } from "@/chats/models/chat.model";
import { PaginatedChatPreview } from "@/chats/models/paginated-chat-preview.model";
import { PaginationArgs } from "@/common/dtos/pagination.args";
import { CHAT_UPDATED_EVENT } from "@/constants";
import { MessagesService } from "@/messages/messages.service";
import { RedisPubSubService } from "@/pubsub/redis-pubsub.service";
import { UsersService } from "@/users/users.service";

@UseGuards(GqlAuthGuard)
@Resolver(() => ChatPreview)
export class ChatsPreviewResolver {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
    private readonly redisPubSub: RedisPubSubService
  ) {}

  @Subscription(() => ChatPreview, {
    async filter(this: ChatsPreviewResolver, payload, _variables, context) {
      const currentUser = context.connection.user;

      const existingChat = await this.chatsService.findOneById(
        payload.chatUpdated.id,
        currentUser.id
      );

      return !!existingChat;
    },
  })
  async chatUpdated() {
    return this.redisPubSub.asyncIterator(CHAT_UPDATED_EVENT);
  }

  @Query(() => PaginatedChatPreview)
  async recentChats(@Args() pagination: PaginationArgs, @CurrentUser() me: User) {
    return this.chatsService.findManyByUserId(me.id, pagination);
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
