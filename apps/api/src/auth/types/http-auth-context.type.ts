import type { User } from "@/users/models/user.model";

export interface HttpAuthContext {
  user: User;
}
