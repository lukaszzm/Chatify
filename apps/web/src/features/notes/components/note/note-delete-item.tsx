import { DropdownMenuItem } from "@chatify/ui";
import { Trash } from "lucide-react";

import { useDeleteNote } from "@/features/notes/hooks/use-delete-note";
import { useNote } from "@/features/notes/hooks/use-note";

export const NoteDeleteItem = () => {
  const { id } = useNote();
  const { deleteNote } = useDeleteNote();

  return (
    <DropdownMenuItem variant="destructive" flex onClick={() => deleteNote(id)}>
      <Trash size={16} />
      <span>Delete</span>
    </DropdownMenuItem>
  );
};
