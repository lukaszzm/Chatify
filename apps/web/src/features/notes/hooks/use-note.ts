import { useContext } from "react";

import { NoteContext } from "@/features/notes/contexts/note-context";

export const useNote = () => {
  const context = useContext(NoteContext);

  if (!context) {
    throw new Error("useNote must be used within a NoteProvider");
  }

  return context;
};
