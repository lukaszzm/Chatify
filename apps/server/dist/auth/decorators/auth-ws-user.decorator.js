"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWsId = void 0;
const common_1 = require("@nestjs/common");
exports.AuthWsId = (0, common_1.createParamDecorator)(async (data, context) => {
    const socket = context.switchToWs().getClient();
    return socket.handshake.query.id;
});
//# sourceMappingURL=auth-ws-user.decorator.js.map