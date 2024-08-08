import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 10 })
  first: number;

  @Field(() => String, { nullable: true })
  after?: string;
}
