import { Field, ObjectType } from "@nestjs/graphql";
import { IsObject, IsString } from "class-validator";

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

  @Field(() => String)
  @IsString()
  userId: string;

  @Field(() => User)
  @IsObject()
  user: User;
}
