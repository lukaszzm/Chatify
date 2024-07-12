import { Skeleton } from "@chatify/ui";

const ResultSkeleton = () => {
  return <Skeleton className="w-full h-28" />;
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
