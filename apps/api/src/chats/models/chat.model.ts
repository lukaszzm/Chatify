import { Field, ObjectType } from "@nestjs/graphql";

import { ChatType } from "@/chats/enums/chat-type";
import { BaseModel } from "@/common/models/base.model";
import { Message } from "@/messages/models/message.model";
import { User } from "@/users/models/user.model";

@ObjectType()
export class Chat extends BaseModel {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Boolean)
  isDeleted: boolean;

  @Field(() => [Message])
  messages: Message[];

  @Field(() => ChatType)
  type: ChatType;

  @Field(() => [User])
  participants: User[];
}
