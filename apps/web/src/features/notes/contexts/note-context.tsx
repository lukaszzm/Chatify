import { createContext, useState } from "react";

export interface NoteContextValue {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  editable: boolean;
  toggleEditable: () => void;
}

interface NoteProviderProps {
  note: Omit<NoteContextValue, "editable" | "toggleEditable">;
  children: React.ReactNode;
}

export const NoteContext = createContext<NoteContextValue | null>(null);

export const NoteProvider = ({ note, children }: NoteProviderProps) => {
  const [editable, setEditable] = useState(false);

  const toggleEditable = () => setEditable((prev) => !prev);

  const value = {
    ...note,
    editable,
    toggleEditable,
  } satisfies NoteContextValue;

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
