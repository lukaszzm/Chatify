import { createContext } from "react";

export interface NoteContextValue {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NoteProviderProps {
  note: NoteContextValue;
  children: React.ReactNode;
}

export const NoteContext = createContext<NoteContextValue | null>(null);

export const NoteProvider = ({ note, children }: NoteProviderProps) => {
  return <NoteContext.Provider value={note}>{children}</NoteContext.Provider>;
};
