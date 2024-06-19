import { Skeleton } from "@chatify/ui";

const NotesItemSkeleton = () => {
  return <Skeleton className="w-full h-8 rounded-md" />;
};

export const NotesListSkeleton = () => {
  return (
    <div className="space-y-2">
      <NotesItemSkeleton />
      <NotesItemSkeleton />
      <NotesItemSkeleton />
    </div>
  );
};
