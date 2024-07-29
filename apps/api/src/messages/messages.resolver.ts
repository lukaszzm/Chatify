import type { User as UserType } from "@chatify/db";
import { UseGuards } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
  Subscription,
} from "@nestjs/graphql";

import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "@/auth/guards/gql-auth.guard";
import { ChatsService } from "@/chats/chats.service";
import { Chat } from "@/chats/models/chat.model";
import { MESSAGE_SENT_EVENT } from "@/constants";
import { SendMessageInput } from "@/messages/dtos/send-message.input";
import { MessagesService } from "@/messages/messages.service";
import { Message } from "@/messages/models/message.model";
import { RedisPubSubService } from "@/pubsub/redis-pubsub.service";
import { User } from "@/users/models/user.model";
import { UsersService } from "@/users/users.service";

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly usersService: UsersService,
    private readonly chatsService: ChatsService,
    private readonly redisPubSub: RedisPubSubService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Subscription(() => Message, {
    filter: (payload, variables) => payload.messageSent.chatId === variables.chatId,
  })
  messageSent(@Args("chatId") _chatId: string) {
    return this.redisPubSub.asyncIterator(MESSAGE_SENT_EVENT);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Message])
  async messages(@Args("chatId") chatId: string) {
    return this.messagesService.findManyByChatId(chatId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Message)
  async sendMessage(@Args("data") data: SendMessageInput, @CurrentUser() me: UserType) {
    const message = await this.messagesService.create(data, me.id);

    this.redisPubSub.publish(MESSAGE_SENT_EVENT, { messageSent: message });

    return message;
  }

  @ResolveField(() => User)
  async sender(@Parent() message: Message) {
    return this.usersService.findOneById(message.senderId);
  }

  @ResolveField(() => Chat)
  async chat(@Parent() message: Message) {
    return this.chatsService.findOneById(message.chatId, message.senderId);
  }
}
