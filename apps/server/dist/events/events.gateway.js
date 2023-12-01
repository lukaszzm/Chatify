"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const create_message_dto_1 = require("../messages/dtos/create-message.dto");
const common_1 = require("@nestjs/common");
const messages_service_1 = require("../messages/messages.service");
const ws_guard_1 = require("../auth/guards/ws.guard");
const auth_ws_user_decorator_1 = require("../auth/decorators/auth-ws-user.decorator");
const jwt_1 = require("@nestjs/jwt");
let EventsGateway = class EventsGateway {
    constructor(messageService, jwtService) {
        this.messageService = messageService;
        this.jwtService = jwtService;
        this.activeUsers = new Map();
    }
    async handleMessage(body, authId) {
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
    async handleConnection(socket) {
        try {
            const token = this.extractTokenFromHandshake(socket);
            const { sub } = await this.jwtService.verifyAsync(token);
            this.activeUsers.set(sub, socket.id);
        }
        catch (e) {
            socket.disconnect(true);
        }
    }
    async handleDisconnect(socket) {
        try {
            const token = this.extractTokenFromHandshake(socket);
            const { sub } = await this.jwtService.verifyAsync(token);
            if (this.activeUsers.has(sub))
                this.activeUsers.delete(sub);
        }
        catch (e) { }
    }
    extractTokenFromHandshake(socket) {
        var _a, _b;
        return (_b = (_a = socket.handshake.auth.token) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) !== null && _b !== void 0 ? _b : "";
    }
};
exports.EventsGateway = EventsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, websockets_1.SubscribeMessage)("send-message"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, auth_ws_user_decorator_1.AuthWsId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto, String]),
    __metadata("design:returntype", Promise)
], EventsGateway.prototype, "handleMessage", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], EventsGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], EventsGateway.prototype, "handleDisconnect", null);
exports.EventsGateway = EventsGateway = __decorate([
    (0, common_1.UseGuards)(ws_guard_1.AuthWsGuard),
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: "*",
        },
    }),
    __metadata("design:paramtypes", [messages_service_1.MessagesService, jwt_1.JwtService])
], EventsGateway);
//# sourceMappingURL=events.gateway.js.map