import type { User } from "@prisma/client";

interface HttpGqlConnectionContext {
  req: { user: User };
}

interface WebSocketGqlConntectionContext {
  connection: { user: User };
}

export type GqlConnectionContext =
  | HttpGqlConnectionContext
  | WebSocketGqlConntectionContext;
