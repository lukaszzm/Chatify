import { Server, Socket } from "socket.io";
import { CreateMessageDto } from "../messages/dtos/create-message.dto";
import { MessagesService } from "../messages/messages.service";
import { JwtService } from "@nestjs/jwt";
export declare class EventsGateway {
    private readonly messageService;
    private readonly jwtService;
    server: Server;
    activeUsers: Map<string, string>;
    constructor(messageService: MessagesService, jwtService: JwtService);
    handleMessage(body: CreateMessageDto, authId: string): Promise<void>;
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(socket: Socket): Promise<void>;
    private extractTokenFromHandshake;
}
//# sourceMappingURL=events.gateway.d.ts.map