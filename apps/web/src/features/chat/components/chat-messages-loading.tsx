import { Skeleton } from "@chatify/ui";

export const ChatMessagesLoading = () => {
  return (
    <>
      <Skeleton className="w-full max-w-xs h-12" />
      <Skeleton className="w-full max-w-xs h-44 ml-auto" />
      <Skeleton className="w-full max-w-xs h-16" />
      <Skeleton className="w-full max-w-xs h-32" />
      <Skeleton className="w-full max-w-xs h-12 ml-auto" />
    </>
  );
};
