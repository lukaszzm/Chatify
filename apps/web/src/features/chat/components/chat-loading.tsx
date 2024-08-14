import { Avatar, Container, ScrollArea, Skeleton } from "@chatify/ui";

const ChatHeaderSkeleton = () => {
  return (
    <div className="flex items-center gap-4 border-b border-border p-2 pb-4">
      <Avatar>
        <Skeleton className="size-full" />
      </Avatar>
      <Skeleton className="h-8 w-72" />
    </div>
  );
};

const ChatBoxSkeleton = () => {
  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col-reverse gap-4 px-4">
        <Skeleton className="ml-auto h-12 w-full max-w-xs" />
        <Skeleton className="h-12 w-full max-w-xs" />
        <Skeleton className="ml-auto h-44 w-full max-w-xs" />
        <Skeleton className="h-16 w-full max-w-xs" />
        <Skeleton className="h-32 w-full max-w-xs" />
        <Skeleton className="ml-auto h-12 w-full max-w-xs" />
        <Skeleton className="h-12 w-full max-w-xs" />
      </div>
    </ScrollArea>
  );
};

const ChatNewMessageSkeleton = () => {
  return (
    <div className="flex h-24 items-start gap-2 border-t border-border px-4 pt-5">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="size-12" />
    </div>
  );
};

export const ChatLoading = () => {
  return (
    <Container className="flex flex-col">
      <ChatHeaderSkeleton />
      <ChatBoxSkeleton />
      <ChatNewMessageSkeleton />
    </Container>
  );
};
