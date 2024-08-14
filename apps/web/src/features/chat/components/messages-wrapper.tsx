import { ChatBubble } from "@chatify/ui";

import { useAuth } from "@/features/auth";
import { MoreChatMessages } from "@/features/chat/components/more-chat-messages";
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
        <MoreChatMessages cursor={messages.pageInfo.endCursor} />
      )}
    </>
  );
};
