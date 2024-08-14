import { Skeleton } from "@chatify/ui";

export const ChatMessagesLoading = () => {
  return (
    <>
      <Skeleton className="ml-auto h-12 w-full max-w-xs" />
      <Skeleton className="h-12 w-full max-w-xs" />
      <Skeleton className="ml-auto h-44 w-full max-w-xs" />
      <Skeleton className="h-16 w-full max-w-xs" />
      <Skeleton className="h-32 w-full max-w-xs" />
      <Skeleton className="ml-auto h-12 w-full max-w-xs" />
      <Skeleton className="h-12 w-full max-w-xs" />
    </>
  );
};
