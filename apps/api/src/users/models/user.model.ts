import { Field, HideField, ObjectType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";
import { BaseModel } from "@/common/models/base.model";

@ObjectType()
export class User extends BaseModel {
  @Field()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;

  @HideField()
  password: string;
}
