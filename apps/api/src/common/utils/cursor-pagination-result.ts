import type { PaginationArgs } from "@/common/dtos/pagination.args";

type EntityWithTimestamp = {
  createdAt: Date;
} & Record<string, unknown>;

export interface CursorPaginationResult<T extends EntityWithTimestamp> {
  edges: { cursor: string; node: T }[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor?: string;
  };
}

export function createCursorPaginationResult<T extends EntityWithTimestamp>(
  items: T[],
  pagination: PaginationArgs
): CursorPaginationResult<T> {
  const hasNextPage = items.length > pagination.first;
  const edges = hasNextPage ? items.slice(0, -1) : items;
  const endCursor = hasNextPage ? edges.at(-1)?.createdAt.toString() : undefined;

  return {
    edges: edges.map((item) => ({
      cursor: item.createdAt.toString(),
      node: item,
    })),
    pageInfo: {
      hasNextPage,
      endCursor,
    },
  };
}
