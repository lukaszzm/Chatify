import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { User } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "@/auth/types/jwt-payload.type";
import { UsersService } from "@/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
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
