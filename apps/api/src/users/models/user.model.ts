import { Field, HideField, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsEmail, IsString } from "class-validator";

import { BaseModel } from "@/common/models/base.model";

@ObjectType()
export class User extends BaseModel {
  @Field()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  firstName: string;

  @Field(() => String)
  @IsString()
  lastName: string;

  @Field(() => Boolean)
  @IsBoolean()
  isActive: boolean;

  @HideField()
  @IsString()
  password: string;
}
