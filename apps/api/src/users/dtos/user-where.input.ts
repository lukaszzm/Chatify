import { Field, InputType } from "@nestjs/graphql";

@InputType({
  isAbstract: true,
})
export class UserWhereInput {
  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  fullName?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;
}
