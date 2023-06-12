import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { SignUpCredentialsDto } from "./dtos/sign-up-credentials.dto";
import { SignInCredentialsDto } from "./dtos/sign-in-credentials.dto";
import { AuthService } from "./auth.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  @UseInterceptors(FileInterceptor("profileImage"))
  signUp(
    @Body() credentials: SignUpCredentialsDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: ".(png|jpeg|jpg)" }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.authService.signUp(credentials, file);
  }

  @Post("sign-in")
  signIn(@Body() credentials: SignInCredentialsDto) {
    return this.authService.signIn(credentials);
  }
}
