import type { User as UserType } from "@chatify/db";
import { UseGuards } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Subscription,
  Query,
} from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";

import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "@/auth/guards/gql-auth.guard";
import { ChatsService } from "@/chats/chats.service";
import { Chat } from "@/chats/models/chat.model";
import { SendMessageInput } from "@/messages/dtos/send-message.input";
import { MessagesService } from "@/messages/messages.service";
import { Message } from "@/messages/models/message.model";
import { User } from "@/users/models/user.model";
import { UsersService } from "@/users/users.service";

const pubSub = new PubSub();

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly chatsService: ChatsService,
    private readonly usersService: UsersService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Subscription(() => Message, {
    filter: (payload, variables) => payload.messageSent.chatId === variables.chatId,
  })
  messageSent(@Args("chatId") _chatId: string) {
    return pubSub.asyncIterator("messageSent");
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
    pubSub.publish("messageSent", { messageSent: message });

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
