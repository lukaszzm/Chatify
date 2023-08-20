/// <reference types="multer" />
import { UsersService } from "../users/users.service";
import { SignUpCredentialsDto } from "./dtos/sign-up-credentials.dto";
import { SignInCredentialsDto } from "./dtos/sign-in-credentials.dto";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signUp(credentials: SignUpCredentialsDto, file?: Express.Multer.File): Promise<{
        access_token: string;
    }>;
    signIn(credentials: SignInCredentialsDto): Promise<{
        access_token: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map