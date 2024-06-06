import { Field, HideField, ObjectType } from "@nestjs/graphql";
import { Allow, IsEmail, IsOptional } from "class-validator";

import { BaseModel } from "@/common/models/base.model";

@ObjectType()
export class User extends BaseModel {
  @Field()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @Allow()
  @IsOptional()
  firstName?: string;

  @Field(() => String, { nullable: true })
  @Allow()
  @IsOptional()
  lastName?: string;

  @Field(() => Boolean, { nullable: true })
  @Allow()
  @IsOptional()
  isActive?: boolean;

  @HideField()
  @Allow()
  password: string;
}
