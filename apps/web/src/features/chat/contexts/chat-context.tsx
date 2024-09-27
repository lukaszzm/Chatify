import { createContext } from "react";

import type { ChatType, User } from "@/generated/graphql";

export interface ChatContextValue {
  id: string;
  type: ChatType;
  participants: Array<Pick<User, "id" | "firstName" | "lastName">>;
}

interface ChatProviderProps {
  chat: ChatContextValue;
  children: React.ReactNode;
}

export const ChatContext = createContext<ChatContextValue | null>(null);

export const ChatProvider = ({ chat, children }: ChatProviderProps) => {
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
};
