import { Skeleton } from "@chatify/ui";

export const ChatListSkeleton = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
    </div>
  );
};
