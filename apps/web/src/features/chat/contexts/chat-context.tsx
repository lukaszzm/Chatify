import { createContext } from "react";

import type { ChatType } from "@/gql/graphql";
import type { User } from "@/types";

export interface ChatContextValue {
  id: string;
  type: ChatType;
  participants: Pick<User, "id" | "firstName" | "lastName">[];
}

interface ChatProviderProps {
  chat: ChatContextValue;
  children: React.ReactNode;
}

export const ChatContext = createContext<ChatContextValue | null>(null);

export const ChatProvider = ({ chat, children }: ChatProviderProps) => {
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
};
