import { ChatBubble, ErrorComponent } from "@chatify/ui";

import { ChatMessagesLoading } from "@/features/chat/components/chat-messages-loading";
import { useChat } from "@/features/chat/hooks/use-chat";
import { useMessagesQuery } from "@/features/chat/hooks/use-messages-query";
import { formatDate } from "@/utils/format-date";

export const ChatMessages = () => {
  const { id } = useChat();
  const { data, fetching, error } = useMessagesQuery(id);

  if (fetching) {
    return <ChatMessagesLoading />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-muted-foreground text-center text-sm">
        You don&apos;t have any messages in this conversation yet.
      </p>
    );
  }

  return (
    <>
      {data.map((message) => (
        <ChatBubble
          key={message.id}
          createdAt={formatDate(message.createdAt)}
          firstName={message.sender.firstName}
          lastName={message.sender.lastName}
        >
          {message.content}
        </ChatBubble>
      ))}
    </>
  );
};
