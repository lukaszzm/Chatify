import { Resolver } from "@nestjs/graphql";

import { Message } from "@/messages/models/message.model";

@Resolver(() => Message)
export class MessagesResolver {
  constructor() {}
}
