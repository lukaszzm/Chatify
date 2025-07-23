import type { PaginationArgs } from "@/common/dtos/pagination.args";

export interface CursorPaginationResult<TEntity extends Record<string, unknown>> {
  edges: { cursor: TEntity[keyof TEntity]; node: TEntity }[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor?: TEntity[keyof TEntity];
  };
}

export function createCursorPaginationResult<
  TEntity extends Record<string, unknown>,
  TColumn extends keyof TEntity,
>(
  items: TEntity[],
  column: TColumn,
  pagination: PaginationArgs
): CursorPaginationResult<TEntity> {
  const hasNextPage = items.length > pagination.first;
  const edges = hasNextPage ? items.slice(0, -1) : items;
  const endCursor = hasNextPage ? edges.at(-1)?.[column] : undefined;

  return {
    edges: edges.map((item) => ({
      cursor: item[column],
      node: item,
    })),
    pageInfo: {
      hasNextPage,
      endCursor,
    },
  };
}
