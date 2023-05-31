import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: "Random Secret Key",
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          let data = request?.cookies["auth-cookie"];
          if (!data) return null;

          return data.token;
        },
      ]),
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
