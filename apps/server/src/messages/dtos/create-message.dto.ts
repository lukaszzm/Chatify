import { IsDateString, IsString } from "class-validator";

export class CreateMessageDto {
  @IsString()
  text: string;

  @IsString()
  fromId: string;

  @IsString()
  toId: string;

  @IsDateString()
  createdAt: string;
}
