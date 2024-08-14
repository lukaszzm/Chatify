import { Skeleton } from "@chatify/ui";

const ResultSkeleton = () => {
  return <Skeleton className="h-28 w-full" />;
};

export const ResultsLoading = () => {
  return (
    <div className="flex gap-2">
      <ResultSkeleton />
      <ResultSkeleton />
      <ResultSkeleton />
    </div>
  );
};
