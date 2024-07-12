import { ArgsType, Field } from "@nestjs/graphql";

import { PaginationInput } from "@/common/dtos/pagination.input";
import { SortOrder } from "@/common/enums/sort-order";
import { UserWhereInput } from "@/users/dtos/user-where.input";

@ArgsType()
export class UsersArgs {
  @Field(() => PaginationInput, { nullable: true })
  pagination?: PaginationInput;

  @Field(() => SortOrder, { nullable: true })
  order?: SortOrder;

  @Field(() => UserWhereInput, { nullable: true })
  where?: UserWhereInput;

  @Field(() => Boolean, { defaultValue: true })
  excludeMe: boolean;
}
