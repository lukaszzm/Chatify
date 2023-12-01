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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWsGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
let AuthWsGuard = class AuthWsGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const socket = context.switchToWs().getClient();
        const token = this.extractTokenFromHandshake(socket);
        try {
            const payload = await this.jwtService.verifyAsync(token);
            socket.handshake.query.id = payload.sub;
        }
        catch (err) {
            throw new websockets_1.WsException("Invalid token");
        }
        return true;
    }
    extractTokenFromHandshake(socket) {
        var _a, _b;
        return (_b = (_a = socket.handshake.auth.token) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) !== null && _b !== void 0 ? _b : "";
    }
};
exports.AuthWsGuard = AuthWsGuard;
exports.AuthWsGuard = AuthWsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthWsGuard);
//# sourceMappingURL=ws.guard.js.map