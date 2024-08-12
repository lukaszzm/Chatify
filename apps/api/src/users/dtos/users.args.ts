import { ArgsType, Field, Int } from "@nestjs/graphql";

import { UserWhereInput } from "@/users/dtos/user-where.input";

@ArgsType()
export class UsersArgs {
  @Field(() => Int, { defaultValue: 3 })
  first: number;

  @Field(() => UserWhereInput, { nullable: true })
  where?: UserWhereInput;

  @Field(() => Boolean, { defaultValue: true })
  excludeMe: boolean;
}
