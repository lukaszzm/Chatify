import { Field, HideField, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

import { BaseModel } from "@/common/models/base.model";

@ObjectType()
export class User extends BaseModel {
  @Field()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  profilePicture?: string;

  @Field(() => String)
  @IsString()
  firstName: string;

  @Field(() => String)
  @IsString()
  lastName: string;

  @Field(() => String)
  @IsString()
  fullName: string;

  @Field(() => Boolean)
  @IsBoolean()
  isActive: boolean;

  @HideField()
  @IsString()
  password: string;
}
