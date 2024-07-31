import { Avatar, Container, Skeleton } from "@chatify/ui";

const ChatHeaderSkeleton = () => {
  return (
    <div className="border-b border-border p-2 pb-4 flex items-center gap-4">
      <Avatar>
        <Skeleton className="size-full" />
      </Avatar>
      <Skeleton className="w-72 h-8" />
    </div>
  );
};

const ChatBoxSkeleton = () => {
  return (
    <div className="p-4 space-y-2 flex-1">
      <Skeleton className="w-full max-w-xs h-12" />
      <Skeleton className="w-full max-w-xs h-44 ml-auto" />
      <Skeleton className="w-full max-w-xs h-16" />
      <Skeleton className="w-full max-w-xs h-32" />
      <Skeleton className="w-full max-w-xs h-12 ml-auto" />
    </div>
  );
};

const ChatNewMessageSkeleton = () => {
  return (
    <div className="px-4 pt-5 border-t border-border flex items-start gap-2 h-24">
      <Skeleton className="w-full h-12" />
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
