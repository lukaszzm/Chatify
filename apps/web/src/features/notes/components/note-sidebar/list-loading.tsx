import { Skeleton } from "@chatify/ui";

const NotesItemSkeleton = () => {
  return <Skeleton className="w-full h-14 rounded-md" />;
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
