import { Body, Controller, Post } from "@nestjs/common";
import { SignUpCredentialsDto } from "./dtos/sign-up-credentials.dto";
import { SignInCredentialsDto } from "./dtos/sign-in-credentials.dto";
import { FileSystemStoredFile, FormDataRequest } from "nestjs-form-data";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  @FormDataRequest({ storage: FileSystemStoredFile })
  signUp(@Body() credentials: SignUpCredentialsDto) {
    console.log(credentials);
    return null;
  }

  @Post("sign-in")
  signIn(@Body() credentials: SignInCredentialsDto) {
    return null;
  }
}
