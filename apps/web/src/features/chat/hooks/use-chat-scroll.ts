import { useEffect, useRef } from "react";

import type { MessagesQuery, User } from "@/generated/graphql";

export const useChatScroll = (
  messages: MessagesQuery["messages"],
  currentUser: User | null
) => {
  const chatScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const message = messages.edges[0];

    if (message && message.node.sender.id === currentUser?.id) {
      chatScroll.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [messages, currentUser]);

  return chatScroll;
};
