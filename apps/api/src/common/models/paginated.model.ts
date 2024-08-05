import { Type } from "@nestjs/common";
import { Field, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "@/common/models/page-info.model";

export function Paginated<T>(classRef: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    edges: T[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }
  return PaginatedType;
}
