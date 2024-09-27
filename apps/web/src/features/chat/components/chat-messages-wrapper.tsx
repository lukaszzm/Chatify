import { ChatBubble } from "@chatify/ui";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { ChatMessagesMore } from "@/features/chat/components/chat-messages-more";
import { useChatScroll } from "@/features/chat/hooks/use-chat-scroll";
import type { MessagesQuery } from "@/generated/graphql";
import { formatDate } from "@/utils/format-date";

interface ChatMessagesWrapperProps extends Pick<MessagesQuery, "messages"> {}

export const ChatMessagesWrapper = ({ messages }: ChatMessagesWrapperProps) => {
  const { user } = useAuth();

  const ref = useChatScroll(messages, user);

  return (
    <>
      <div className="h-0 w-full" ref={ref} />

      {messages.edges.map((edge) => (
        <ChatBubble
          key={edge.node.id}
          createdAt={formatDate(edge.node.createdAt)}
          sender={edge.node.sender}
          isMine={edge.node.sender.id === user?.id}
        >
          {edge.node.content}
        </ChatBubble>
      ))}

      {messages.pageInfo.hasNextPage && (
        <ChatMessagesMore cursor={messages.pageInfo.endCursor} />
      )}
    </>
  );
};
