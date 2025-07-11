import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import type { User } from "@prisma/client";

import type { GqlConnectionContext } from "@/auth/types/gql-connection-context.type";
import type { HttpAuthContext } from "@/auth/types/http-auth-context.type";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User => {
    if (context.getType() === "http") {
      return context.switchToHttp().getRequest<HttpAuthContext>().user;
    }

    const gqlExecutionContext = GqlExecutionContext.create(context);
    const gqlContext = gqlExecutionContext.getContext<GqlConnectionContext>();

    return "req" in gqlContext ? gqlContext.req.user : gqlContext.connection.user;
  }
);
