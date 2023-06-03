import { IsString } from "class-validator";

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  text: string;

  //TODO: Change to better type
  @IsString()
  createdAt: string;
}
