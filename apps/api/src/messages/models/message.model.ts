import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Allow, IsBoolean, IsObject, IsString } from "class-validator";

import { Chat } from "@/chats/models/chat.model";
import { BaseModel } from "@/common/models/base.model";
import { User } from "@/users/models/user.model";

@ObjectType()
export class Message extends BaseModel {
  @Field(() => String)
  @IsString()
  text: string;

  @Field(() => Boolean)
  @IsBoolean()
  isSeen: boolean;

  @Field(() => Boolean)
  @IsBoolean()
  isDeleted: boolean;

  @Field(() => ID)
  @Allow()
  senderId: string;

  @Field(() => User)
  @IsObject()
  sender: User;

  @Field(() => ID)
  @Allow()
  chatId: string;

  @Field(() => Chat)
  @IsObject()
  chat: Chat;
}
