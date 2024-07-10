import { createContext } from "react";

import { useToggleLock } from "@/features/notes/hooks/use-toggle-lock";

export interface NoteContextValue {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  isLocked: boolean;
  toggleLock: (noteId: string) => void;
}

interface NoteProviderProps {
  note: Omit<NoteContextValue, "toggleLock">;
  children: React.ReactNode;
}

export const NoteContext = createContext<NoteContextValue | null>(null);

export const NoteProvider = ({ note, children }: NoteProviderProps) => {
  const { toggleLock } = useToggleLock();

  const value = {
    ...note,
    toggleLock,
  } satisfies NoteContextValue;

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
