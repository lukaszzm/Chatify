import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { Message } from "@/messages/models/message.model";
import { UsersService } from "@/users/users.service";

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly usersService: UsersService) {}

  @ResolveField()
  async sender(@Parent() message: Message) {
    return this.usersService.findOneById(message.senderId);
  }
}
