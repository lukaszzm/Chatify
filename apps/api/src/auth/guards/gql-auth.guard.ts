import type { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

import type { GqlAuthContext } from "@/auth/types/gql-auth-context.type";

export class GqlAuthGuard extends AuthGuard("jwt") {
  getRequest(context: ExecutionContext) {
    const gqlExecutionContext = GqlExecutionContext.create(context);
    const gqlContext = gqlExecutionContext.getContext<GqlAuthContext>();

    if ("extra" in gqlContext.req) {
      return gqlContext.req.extra;
    }

    return gqlContext.req.user;
  }
}
