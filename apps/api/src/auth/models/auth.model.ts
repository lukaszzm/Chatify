import type { User } from "@chatify/db";
import { ObjectType } from "@nestjs/graphql";

import { Token } from "@/auth/models/token.model";

@ObjectType()
export class Auth extends Token {
  user: User;
}
