import { ObjectType } from "@nestjs/graphql";
import { User } from "@prisma/client";

import { Token } from "@/auth/models/token.model";

@ObjectType()
export class Auth extends Token {
  user: User;
}
