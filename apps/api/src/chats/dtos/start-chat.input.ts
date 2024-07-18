import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class StartChatInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @Field(() => [String])
  @IsArray()
  participants: string[];
}
