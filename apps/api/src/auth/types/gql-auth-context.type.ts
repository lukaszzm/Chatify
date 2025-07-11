import type { User } from "@prisma/client";

export interface HttpGqlAuthContext {
  req: { user: User };
}

export interface WebSocketGqlAuthContext {
  req: { extra: { user: User } };
}

export type GqlAuthContext = HttpGqlAuthContext | WebSocketGqlAuthContext;
