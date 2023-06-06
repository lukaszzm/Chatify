import { IsString } from "class-validator";

export class CreateMessageDto {
  @IsString()
  text: string;

  @IsString()
  fromId: string;

  @IsString()
  toId: string;

  // TODO: give better type
  @IsString()
  createdAt: string;
}
