import { ObjectType } from "@nestjs/graphql";

import { Token } from "@/auth/models/token.model";
import { User } from "@/users/models/user.model";

@ObjectType()
export class Auth extends Token {
  user: User;
}
