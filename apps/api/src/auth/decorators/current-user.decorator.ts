import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

import type { GqlConnectionContext } from "@/auth/types/gql-connection-context.type";
import type { HttpAuthContext } from "@/auth/types/http-auth-context.type";
import type { User } from "@/users/models/user.model";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User => {
    if (context.getType() === "http") {
      return context.switchToHttp().getRequest<HttpAuthContext>().user;
    }

    const gqlExecutionContext = GqlExecutionContext.create(context);
    const gqlContext = gqlExecutionContext.getContext<GqlConnectionContext>();

    if ("req" in gqlContext) {
      return gqlContext.req.user;
    }

    return gqlContext.connection.user;
  }
);
