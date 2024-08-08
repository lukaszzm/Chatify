import { Button } from "@chatify/ui";
import { useCallback } from "react";
import { toast } from "sonner";

import { ChatPreview } from "@/features/chat/components/chat-preview";
import { RecentChatsLoading } from "@/features/chat/components/recent-chats-loading";
import { useRecentChatsQuery } from "@/features/chat/hooks/use-recent-chats-query";

interface MoreRecentChatsProps {
  cursor?: string | null;
}

export const MoreRecentChats = ({ cursor }: MoreRecentChatsProps) => {
  const [{ data, fetching, error }, executeQuery] = useRecentChatsQuery({
    after: cursor,
    requestPolicy: "cache-only",
    pause: !cursor,
  });

  const onLoadMore = useCallback(() => {
    executeQuery({ requestPolicy: "cache-first" });
  }, [executeQuery]);

  if (fetching) {
    return <RecentChatsLoading />;
  }

  if (error) {
    toast.error("Failed to load more chats");
    return null;
  }

  if (!data) {
    return (
      <Button variant="muted" size="sm" className="w-full" onClick={onLoadMore}>
        Load more...
      </Button>
    );
  }

  return (
    <>
      {data.recentChats.edges.map((edge) => (
        <ChatPreview key={edge.node.id} {...edge.node} />
      ))}

      {data.recentChats.pageInfo.hasNextPage && (
        <MoreRecentChats cursor={data.recentChats.pageInfo.endCursor} />
      )}
    </>
  );
};
