import { Field, InputType, Int } from "@nestjs/graphql";

@InputType({
  isAbstract: true,
})
export class PaginationInput {
  @Field(() => Int, { defaultValue: 10 })
  take: number = 10;

  @Field(() => Int, { defaultValue: 0 })
  skip: number = 0;
}
