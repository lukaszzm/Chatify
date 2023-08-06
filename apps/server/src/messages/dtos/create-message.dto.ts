import { IsString, IsUUID, MaxLength } from "class-validator";

export class CreateMessageDto {
  @IsString()
  @MaxLength(250)
  text: string;

  @IsUUID()
  toId: string;
}
