import { useEffect, useRef } from "react";

import type { AuthUser } from "@/features/auth/contexts/auth-context";
import type { MessagesQuery } from "@/gql/graphql";

interface UseChatScrollProps {
  messages: MessagesQuery["messages"];
  currentUser: AuthUser | null;
}

export const useChatScroll = ({ messages, currentUser }: UseChatScrollProps) => {
  const chatScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const message = messages.edges[0];

    if (message && message.node.sender.id === currentUser?.id) {
      chatScroll.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [messages, currentUser]);

  return chatScroll;
};
