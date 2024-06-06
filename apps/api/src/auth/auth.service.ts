import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

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

  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await this.passwordService.verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    return this.generateTokens({
      sub: user.id,
      email: user.email,
    });
  }

  async getUserFromToken(token: string): Promise<User | null> {
    const userId = this.jwtService.decode<JwtPayload>(token).sub;
    return this.usersService.findOneById(userId);
  }

  generateTokens(payload: JwtPayload): {
    accessToken: string;
    refreshToken: string;
  } {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>("JWT_SECRET"),
    });
  }

  generateRefreshToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
      expiresIn: this.configService.get<string>("JWT_REFRESH_EXPIRATION_TIME"),
    });
  }

  refreshToken(token: string) {
    try {
      const { sub, email } = this.jwtService.verify<JwtPayload>(token, {
        secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
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
