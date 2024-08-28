import type { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

export class GqlAuthGuard extends AuthGuard("jwt") {
  getRequest(context: ExecutionContext) {
    const context_ = GqlExecutionContext.create(context);
    const { req } = context_.getContext();

    return req.extra ?? req;
  }
}
