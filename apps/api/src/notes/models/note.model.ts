import { Field, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsObject, IsString } from "class-validator";

import { BaseModel } from "@/common/models/base.model";
import { User } from "@/users/models/user.model";

@ObjectType()
export class Note extends BaseModel {
  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  content: string;

  @Field(() => Boolean)
  @IsBoolean()
  isLocked: boolean;

  @Field(() => String)
  @IsString()
  userId: string;

  @Field(() => User)
  @IsObject()
  user: User;
}
