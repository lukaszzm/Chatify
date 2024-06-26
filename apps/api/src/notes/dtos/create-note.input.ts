import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateNoteInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;
}
