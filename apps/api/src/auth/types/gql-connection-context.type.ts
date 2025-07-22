import type { User } from "@/users/models/user.model";

interface HttpGqlConnectionContext {
  req: { user: User };
}

interface WebSocketGqlConntectionContext {
  connection: { user: User };
}

export type GqlConnectionContext =
  | HttpGqlConnectionContext
  | WebSocketGqlConntectionContext;
