import { ChatBubble } from "@chatify/ui";

import { useAuth } from "@/features/auth";
import { useChatScroll } from "@/features/chat/hooks/use-chat-scroll";
import type { MessagesQuery } from "@/gql/graphql";
import { formatDate } from "@/utils/format-date";

interface MessagesWrapperProps {
  messages: MessagesQuery["messages"];
}
export const MessagesWrapper = ({ messages }: MessagesWrapperProps) => {
  const { user } = useAuth();

  const ref = useChatScroll({
    messages,
    currentUser: user,
  });

  return (
    <div className="p-4 space-y-4">
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          createdAt={formatDate(message.createdAt)}
          sender={message.sender}
          isMine={message.sender.id === user?.id}
        >
          {message.content}
        </ChatBubble>
      ))}

      <div className="w-full h-0" ref={ref} />
    </div>
  );
};
