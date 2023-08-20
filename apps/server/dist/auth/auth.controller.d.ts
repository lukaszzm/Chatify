/// <reference types="multer" />
import { SignUpCredentialsDto } from "./dtos/sign-up-credentials.dto";
import { SignInCredentialsDto } from "./dtos/sign-in-credentials.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(credentials: SignUpCredentialsDto, file?: Express.Multer.File): Promise<{
        access_token: string;
    }>;
    signIn(credentials: SignInCredentialsDto): Promise<{
        access_token: string;
    }>;
}
//# sourceMappingURL=auth.controller.d.ts.map