import { IsEmail, IsOptional, IsString } from "class-validator";
import { HasMimeType, IsFile, MaxFileSize, FileSystemStoredFile } from "nestjs-form-data";

export class SignUpCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsFile()
  @MaxFileSize(5e6)
  @HasMimeType(["image/jpeg", "image/jpg", "image/png"])
  profileImage?: FileSystemStoredFile;
}
