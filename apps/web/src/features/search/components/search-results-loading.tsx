import { Skeleton } from "@chatify/ui";

const SearchResultSkeleton = () => <Skeleton className="h-28 w-full" />;

export const SearchResultsLoading = () => {
  return (
    <div className="flex gap-2">
      <SearchResultSkeleton />
      <SearchResultSkeleton />
      <SearchResultSkeleton />
    </div>
  );
};
