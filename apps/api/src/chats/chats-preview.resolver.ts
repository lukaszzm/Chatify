import { UseGuards } from "@nestjs/common";
import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from "@nestjs/graphql";
import type { User } from "@prisma/client";

import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "@/auth/guards/gql-auth.guard";
import { WebSocketGqlAuthContext } from "@/auth/types/gql-auth-context.type";
import { ChatsService } from "@/chats/chats.service";
import { ChatPreview } from "@/chats/models/chat-preview.model";
import { Chat } from "@/chats/models/chat.model";
import { PaginatedChatPreview } from "@/chats/models/paginated-chat-preview.model";
import { ChatUpdatedPayload } from "@/chats/types/chat-subscription.types";
import { PaginationArgs } from "@/common/dtos/pagination.args";
import { CHAT_UPDATED_EVENT } from "@/constants/events";
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
    async filter(
      this: ChatsPreviewResolver,
      payload: ChatUpdatedPayload,
      _variables,
      context: WebSocketGqlAuthContext
    ) {
      const currentUser = context.req.extra.user;

      const existingChat = await this.chatsService.findOneById(
        payload.chatUpdated.id,
        currentUser.id
      );

      return !!existingChat;
    },
  })
  chatUpdated() {
    return this.redisPubSub.asyncIterator(CHAT_UPDATED_EVENT);
  }

  @Query(() => PaginatedChatPreview)
  recentChats(@Args() pagination: PaginationArgs, @CurrentUser() me: User) {
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
