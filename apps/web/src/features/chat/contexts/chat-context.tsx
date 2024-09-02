import { createContext } from "react";

import type { ChatType } from "@/gql/graphql";

export interface ChatContextValue {
  id: string;
  type: ChatType;
  participants: Array<{
    id: string;
    firstName: string;
    lastName: string;
  }>;
}

interface ChatProviderProps {
  chat: ChatContextValue;
  children: React.ReactNode;
}

export const ChatContext = createContext<ChatContextValue | null>(null);

export const ChatProvider = ({ chat, children }: ChatProviderProps) => {
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
};
