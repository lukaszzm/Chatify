import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AuthId = createParamDecorator((data: never, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.user.sub;
});
