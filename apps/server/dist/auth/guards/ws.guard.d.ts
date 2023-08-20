import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
export declare class AuthWsGuard implements CanActivate {
    private jwtService;
    constructor(jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHandshake;
}
//# sourceMappingURL=ws.guard.d.ts.map