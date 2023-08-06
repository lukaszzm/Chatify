import { IsString, MaxLength } from "class-validator";

export class CreateNoteDto {
  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(5000)
  text: string;
}
