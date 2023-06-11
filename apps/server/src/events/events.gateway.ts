import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CreateMessageDto } from "../messages/dtos/create-message.dto";
import { UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { MessagesService } from "../messages/messages.service";
import { AuthWsGuard } from "../auth/guards/ws.guard";
import { AuthWsId } from "../auth/decorators/auth-ws-user.decorator";

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

  constructor(private readonly messageService: MessagesService) {}

  @SubscribeMessage("connect-user")
  async handleUserConnection(@ConnectedSocket() socket: Socket, @AuthWsId() authId: string) {
    console.log("CONNECTED: " + authId);
    this.activeUsers.set(authId, socket.id);
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage("send-message")
  async handleMessage(@MessageBody() body: CreateMessageDto, @AuthWsId() authId: string) {
    console.log("Message sent from: " + authId);
    const message = await this.messageService.create(body, authId);

    const receiverSocketId = this.activeUsers.get(body.toId);
    if (receiverSocketId) {
      console.log("Message sent to: " + body.toId);
      this.server.to(receiverSocketId).emit("receive-message", message);
    }
  }

  // TODO: usuwanie z activeUsers gdy socket zostanie rozłączony
}
