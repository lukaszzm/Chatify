import type { User } from "@prisma/client";

export interface HttpAuthContext {
  user: User;
}
