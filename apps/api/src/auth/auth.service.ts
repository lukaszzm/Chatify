import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { SignInInput } from "@/auth/dtos/sign-in.input";
import { SignUpInput } from "@/auth/dtos/sign-up.input";
import { PasswordService } from "@/auth/password.service";
import { JwtPayload } from "@/auth/types/jwt-payload.type";
import { UsersService } from "@/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService
  ) {}

  async signIn(payload: SignInInput) {
    const fixedEmail = payload.email.toLowerCase();
    const user = await this.usersService.findOneByEmail(fixedEmail);

    if (!user) {
      throw new UnauthorizedException("Incorrect email or password");
    }

    const isPasswordValid = await this.passwordService.verify(
      user.password,
      payload.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Incorrect email or password");
    }

    return this.generateTokens({
      sub: user.id,
      email: user.email,
    });
  }

  async signUp(payload: SignUpInput) {
    const fixedEmail = payload.email.toLowerCase();
    const existingUser = await this.usersService.findOneByEmail(fixedEmail);

    if (existingUser) {
      throw new UnauthorizedException("User with this email already exists");
    }

    const hashedPassword = await this.passwordService.hash(payload.password);

    const user = await this.usersService.create({
      ...payload,
      password: hashedPassword,
    });

    return this.generateTokens({
      sub: user.id,
      email: user.email,
    });
  }

  async getUserFromToken(token: string) {
    const userId = this.jwtService.decode<JwtPayload>(token).sub;
    return this.usersService.findOneById(userId);
  }

  generateTokens(payload: JwtPayload) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  generateAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>("JWT_SECRET"),
    });
  }

  generateRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
      expiresIn: this.configService.getOrThrow<string>("JWT_REFRESH_EXPIRATION_TIME"),
    });
  }

  refreshToken(token: string) {
    try {
      const { sub, email } = this.jwtService.verify<JwtPayload>(token, {
        secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
      });

      return this.generateTokens({
        sub,
        email,
      });
    } catch {
      throw new UnauthorizedException();
    }
  }
}
