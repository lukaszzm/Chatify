import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { JwtPayload } from "@/auth/types/jwt-payload.type";
import { User } from "@/users/models/user.model";
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
      secretOrKey: configService.getOrThrow<string>("JWT_SECRET"),
    });
  }

  async validate(validationPayload: JwtPayload): Promise<User | null> {
    return this.usersService.findOneWithPasswordByEmail(validationPayload.email);
  }
}
