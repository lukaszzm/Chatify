import { useEffect, useRef } from "react";

import type { AuthUser } from "@/features/auth";
import type { MessagesQuery } from "@/gql/graphql";

interface UseChatScrollProps {
  messages: MessagesQuery["messages"];
  currentUser: AuthUser | null;
}

export const useChatScroll = ({ messages, currentUser }: UseChatScrollProps) => {
  const chatScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lastMessage = messages.at(-1);

    if (lastMessage && lastMessage.sender.id === currentUser?.id) {
      chatScroll.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [messages, currentUser]);

  return chatScroll;
};
