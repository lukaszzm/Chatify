import type { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

export class GqlAuthGuard extends AuthGuard("jwt") {
  getRequest(context: ExecutionContext): any {
    const context_ = GqlExecutionContext.create(context);

    if ("req" in context_.getContext()) {
      return context_.getContext().req;
    }
    return context_.getContext().req;
  }
}
