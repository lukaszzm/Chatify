import type { Prisma, PrismaClient, PrismaModel, WhereInput } from "@chatify/db";
import { getPrismaDelegate } from "@chatify/db";

import type { PaginationArgs } from "@/common/dtos/pagination.args";

type PaginateConfig<T extends Prisma.ModelName> = {
  client: PrismaClient;
  model: T;
  where: WhereInput<T>;
  pagination: PaginationArgs;
  cursorColumn: keyof PrismaModel<T>;
  order?: Prisma.SortOrder;
};

type PaginateResult<T extends Prisma.ModelName> = {
  edges: { cursor: string; node: PrismaModel<T> }[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor?: string;
  };
};

export async function paginate<T extends Prisma.ModelName>({
  client,
  model,
  where,
  pagination,
  cursorColumn,
  order = "desc",
}: PaginateConfig<T>): Promise<PaginateResult<T>> {
  const take = pagination.first ? pagination.first + 1 : undefined;
  const skip = pagination.after ? 1 : 0;
  const cursor = pagination.after ? { [cursorColumn]: pagination.after } : undefined;

  const delegate = getPrismaDelegate(model, client);

  const results = await delegate.findMany({
    take,
    skip,
    cursor,
    where,
    orderBy: {
      [cursorColumn]: order,
    },
  });

  const nodes = results.slice(0, pagination.first);
  const edges = nodes.map((node) => {
    const cursor = node[cursorColumn];

    if (cursor instanceof Date) {
      return { cursor: cursor.toISOString(), node };
    }

    return { cursor, node };
  });

  const hasNextPage = results.length === take;
  const endCursor = edges.at(-1)?.cursor;

  return {
    edges,
    pageInfo: {
      hasNextPage,
      endCursor,
    },
  };
}
