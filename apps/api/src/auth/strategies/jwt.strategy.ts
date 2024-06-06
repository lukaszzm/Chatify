import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import type { User } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";

import { JwtPayload } from "@/auth/types/jwt-payload.type";
import { UsersService } from "@/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  async validate(validationPayload: JwtPayload): Promise<User | null> {
    return this.usersService.findOneByEmail(validationPayload.email);
  }
}
