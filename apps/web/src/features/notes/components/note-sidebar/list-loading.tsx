import { Skeleton } from "@chatify/ui";

const NotesItemSkeleton = () => {
  return <Skeleton className="h-14 w-full rounded-md" />;
};

export const NotesListLoading = () => {
  return (
    <div className="space-y-2">
      <NotesItemSkeleton />
      <NotesItemSkeleton />
      <NotesItemSkeleton />
    </div>
  );
};
