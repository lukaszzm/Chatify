import { createContext } from "react";

import type { Nullable, User } from "@/types";

export interface ChatContextValue {
  id: string;
  title?: Nullable<string>;
  participants: Pick<User, "id" | "firstName" | "lastName">[];
}

interface ChatProviderProps {
  chat: ChatContextValue;
  children: React.ReactNode;
}

export const ChatContext = createContext<ChatContextValue | null>(null);

export const ChatProvider = ({ chat, children }: ChatProviderProps) => (
  <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>
);
