"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthId = void 0;
const common_1 = require("@nestjs/common");
exports.AuthId = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    return request.user.sub;
});
//# sourceMappingURL=auth-user.decorator.js.map