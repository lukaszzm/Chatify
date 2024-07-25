import { Field, ObjectType } from "@nestjs/graphql";

import { BaseModel } from "@/common/models/base.model";
import { Message } from "@/messages/models/message.model";
import { User } from "@/users/models/user.model";

@ObjectType()
export class ChatPreview extends BaseModel {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Boolean)
  isDeleted: boolean;

  @Field(() => Message)
  latestMessage: Message;

  @Field(() => [User])
  participants: User[];
}
