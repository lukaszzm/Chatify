import type { User } from "@/users/models/user.model";

export interface HttpGqlAuthContext {
  req: { user: User };
}

export interface WebSocketGqlAuthContext {
  req: { extra: { user: User } };
}

export type GqlAuthContext = HttpGqlAuthContext | WebSocketGqlAuthContext;
