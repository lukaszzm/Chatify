import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SignUpCredentialsDto } from "./dtos/sign-up-credentials.dto";
import { SignInCredentialsDto } from "./dtos/sign-in-credentials.dto";
import { FileSystemStoredFile, FormDataRequest } from "nestjs-form-data";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { AuthUser, AuthUserInterface } from "./decorators/auth-user.decorator";
import { User } from "../users/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  @FormDataRequest({ storage: FileSystemStoredFile })
  signUp(@Body() credentials: SignUpCredentialsDto) {
    return this.authService.signUp(credentials);
  }

  @Post("sign-in")
  signIn(@Body() credentials: SignInCredentialsDto) {
    return this.authService.signIn(credentials);
  }
}
