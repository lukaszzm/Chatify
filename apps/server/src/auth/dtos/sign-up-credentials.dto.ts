import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MaxLength(50)
  lastName: string;

  @IsString()
  @MinLength(8)
  password: string;
}
