import { IsDateString, IsString } from "class-validator";

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsDateString()
  createdAt: Date;
}
