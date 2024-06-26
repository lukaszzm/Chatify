import { DropdownMenuItem } from "@chatify/ui";
import { Trash } from "lucide-react";

export const NoteDeleteItem = () => {
  return (
    <DropdownMenuItem variant="destructive" flex>
      <Trash size={16} />
      <span>Delete</span>
    </DropdownMenuItem>
  );
};
