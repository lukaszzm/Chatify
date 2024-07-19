import { ChatBubble, ErrorComponent } from "@chatify/ui";

import { useMessagesQuery } from "@/features/chat/hooks/use-messages-query";
import { formatDate } from "@/utils/format-date";

interface ChatBoxProps {
  chatId: string;
}
export const ChatBox = ({ chatId }: ChatBoxProps) => {
  const { data, fetching, error } = useMessagesQuery(chatId);

  if (fetching) {
    return <p>Loading messages...</p>;
  }

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <div className="p-4 space-y-2 flex-1 overflow-auto">
      {data && data.length !== 0 ? (
        data.map((message) => (
          <ChatBubble
            key={message.id}
            createdAt={formatDate(message.createdAt)}
            firstName={message.sender.firstName}
            lastName={message.sender.lastName}
          >
            {message.content}
          </ChatBubble>
        ))
      ) : (
        <p className="text-muted-foreground text-center text-sm">
          You don&apos;t have any messages in this conversation yet.
        </p>
      )}
    </div>
  );
};
