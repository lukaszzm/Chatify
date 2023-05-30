import { IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  profileImage?: string;

  @IsOptional()
  currentPassword?: string;

  @IsOptional()
  newPassword?: string;
}
