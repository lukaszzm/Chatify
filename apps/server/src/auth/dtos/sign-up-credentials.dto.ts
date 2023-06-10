import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { HasMimeType, IsFile, MaxFileSize, FileSystemStoredFile } from "nestjs-form-data";

export class SignUpCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsFile()
  @MaxFileSize(5e6)
  @HasMimeType(["image/jpeg", "image/jpg", "image/png"])
  profileImage?: FileSystemStoredFile;
}
