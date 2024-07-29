import { Field, ObjectType, ID } from "@nestjs/graphql";
import { GraphQLDateTime } from "graphql-scalars";

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLDateTime)
  createdAt: Date;

  @Field(() => GraphQLDateTime)
  updatedAt: Date;
}
