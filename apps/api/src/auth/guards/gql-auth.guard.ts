import type { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

export class GqlAuthGuard extends AuthGuard("jwt") {
  getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);

    if ("req" in ctx.getContext()) {
      return ctx.getContext().req;
    }
    return ctx.getContext().req;
  }
}
