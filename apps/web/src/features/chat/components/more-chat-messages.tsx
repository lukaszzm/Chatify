import { Button, ChatBubble } from "@chatify/ui";
import { useCallback } from "react";
import { toast } from "sonner";

import { useAuth } from "@/features/auth";
import { useChat } from "@/features/chat/hooks/use-chat";
import { useMessagesQuery } from "@/features/chat/hooks/use-messages-query";
import { formatDate } from "@/utils/format-date";

interface MoreChatMessagesProps {
  cursor?: string | null;
}

export const MoreChatMessages = ({ cursor }: MoreChatMessagesProps) => {
  const { id } = useChat();
  const { user } = useAuth();

  const [{ data, fetching, error }, executeQuery] = useMessagesQuery({
    chatId: id,
    after: cursor,
    requestPolicy: "cache-only",
    pause: !cursor,
  });

  const onLoadMore = useCallback(() => {
    executeQuery({ requestPolicy: "cache-first" });
  }, [executeQuery]);

  if (error) {
    toast.error("Failed to load more messages");
    return null;
  }

  if (!data) {
    return (
      <Button
        variant="muted"
        size="sm"
        className="w-full"
        onClick={onLoadMore}
        isLoading={fetching}
      >
        Load more...
      </Button>
    );
  }

  return (
    <>
      {data.messages.edges.map((edge) => (
        <ChatBubble
          key={edge.node.id}
          createdAt={formatDate(edge.node.createdAt)}
          sender={edge.node.sender}
          isMine={edge.node.sender.id === user?.id}
        >
          {edge.node.content}
        </ChatBubble>
      ))}

      {data.messages.pageInfo.hasNextPage && (
        <MoreChatMessages cursor={data.messages.pageInfo.endCursor} />
      )}
    </>
  );
};
