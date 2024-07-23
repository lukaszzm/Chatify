import type { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

export class GqlAuthGuard extends AuthGuard("jwt") {
  getRequest(context: ExecutionContext): any {
    const context_ = GqlExecutionContext.create(context);

    const { req, connection } = context_.getContext();

    return connection ?? req;
  }
}
