import { ChatBubble, ErrorComponent } from "@chatify/ui";

import { useAuth } from "@/features/auth";
import { ChatBottomLine } from "@/features/chat/components/chat-bottom-line";
import { ChatMessagesLoading } from "@/features/chat/components/chat-messages-loading";
import { useChat } from "@/features/chat/hooks/use-chat";
import { useMessagesSubscription } from "@/features/chat/hooks/use-messages-subscription";
import { formatDate } from "@/utils/format-date";

export const ChatMessages = () => {
  const { user } = useAuth();
  const { id } = useChat();
  const [{ fetching, data, error }] = useMessagesSubscription(id);

  if (fetching) {
    return <ChatMessagesLoading />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  if (!data?.messages || data.messages.length === 0) {
    return (
      <p className="text-muted-foreground text-center text-sm">
        You don&apos;t have any messages in this conversation yet.
      </p>
    );
  }

  return (
    <>
      {data.messages.map((message) => (
        <ChatBubble
          key={message.id}
          createdAt={formatDate(message.createdAt)}
          sender={message.sender}
          isMine={message.sender.id === user?.id}
        >
          {message.content}
        </ChatBubble>
      ))}
      <ChatBottomLine />
    </>
  );
};
