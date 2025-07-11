import type { Prisma, PrismaClient } from "@prisma/client";

import type { PaginationArgs } from "@/common/dtos/pagination.args";
import type { PrismaModel, WhereInput } from "@/common/types/prisma-helpers";

export interface PaginateConfig<T extends Prisma.ModelName> {
  client: PrismaClient;
  model: T;
  where: WhereInput<T>;
  pagination: PaginationArgs;
  cursorColumn: keyof PrismaModel<T>;
  order?: Prisma.SortOrder;
}

export interface PaginateResult<T extends Prisma.ModelName> {
  edges: { cursor: string; node: PrismaModel<T> }[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor?: string;
  };
}

// TODO: Implement cursor-based pagination
export function paginate(): [] {
  return [];
}
