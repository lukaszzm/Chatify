import { createContext, useRef } from "react";

import type { ChatType } from "@/gql/graphql";
import type { User } from "@/types";

export interface ChatContextValue {
  id: string;
  type: ChatType;
  participants: Pick<User, "id" | "firstName" | "lastName">[];
  bottomRef: React.RefObject<HTMLDivElement>;
}

interface ChatProviderProps {
  chat: Omit<ChatContextValue, "bottomRef">;
  children: React.ReactNode;
}

export const ChatContext = createContext<ChatContextValue | null>(null);

export const ChatProvider = ({ chat, children }: ChatProviderProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const value = {
    ...chat,
    bottomRef,
  } satisfies ChatContextValue;

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
