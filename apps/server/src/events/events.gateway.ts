import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CreateMessageDto } from "../messages/dtos/create-message.dto";
import { UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { MessagesService } from "../messages/messages.service";
import { AuthWsGuard } from "../auth/guards/ws.guard";
import { AuthWsId } from "../auth/decorators/auth-ws-user.decorator";
import { JwtService } from "@nestjs/jwt";

@UseGuards(AuthWsGuard)
@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  activeUsers = new Map<string, string>();

  constructor(private readonly messageService: MessagesService, private readonly jwtService: JwtService) {}

  @UsePipes(new ValidationPipe())
  @SubscribeMessage("send-message")
  async handleMessage(@MessageBody() body: CreateMessageDto, @AuthWsId() authId: string) {
    const message = await this.messageService.create(body, authId);

    const senderSocketId = this.activeUsers.get(authId);
    const receiverSocketId = this.activeUsers.get(body.toId);

    if (senderSocketId) {
      this.server.to(senderSocketId).emit("receive-message", message);
    }

    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit("receive-message", message);
    }
  }

  async handleConnection(@ConnectedSocket() socket: Socket) {
    try {
      const token = this.extractTokenFromHandshake(socket);
      const { sub } = await this.jwtService.verifyAsync(token);
      this.activeUsers.set(sub, socket.id);
    } catch (e) {
      socket.disconnect(true);
    }
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    try {
      const token = this.extractTokenFromHandshake(socket);
      const { sub } = await this.jwtService.verifyAsync(token);
      if (this.activeUsers.has(sub)) this.activeUsers.delete(sub);
    } catch (e) {}
  }

  private extractTokenFromHandshake(socket: Socket) {
    return socket.handshake.auth.token?.split(" ")[1] ?? "";
  }
}
