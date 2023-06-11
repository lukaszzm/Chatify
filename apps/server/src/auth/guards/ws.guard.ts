import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Socket } from "socket.io";
import { WsException } from "@nestjs/websockets";
import { jwtConstants } from "../constants";

@Injectable()
export class AuthWsGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const socket = context.switchToWs().getClient<Socket>();
    const token = socket.handshake.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("ERROR");
      throw new WsException("Invalid token");
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      socket.handshake.query.id = payload.sub;
      console.log("OK");
    } catch (err) {
      console.log("ERROR");
      throw new WsException("Invalid token");
    }

    return true;
  }
}
