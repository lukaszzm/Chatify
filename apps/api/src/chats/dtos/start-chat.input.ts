import { Field, InputType } from "@nestjs/graphql";
import { IsArray } from "class-validator";

@InputType()
export class StartChatInput {
  @Field(() => [String])
  @IsArray()
  participants: string[];
}
