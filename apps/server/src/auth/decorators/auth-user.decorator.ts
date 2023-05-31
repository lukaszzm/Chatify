import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface AuthUserInterface {
  email: string;
  id: string;
}

export const AuthUser = createParamDecorator((data: never, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return {
    email: request.user.email,
    id: request.user.sub,
  } as AuthUserInterface;
});
