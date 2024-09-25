import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@chatify/ui";
import { EllipsisVertical } from "lucide-react";

import { NoteDeleteItem } from "@/features/notes/components/note-delete-item";
import { NoteLockItem } from "@/features/notes/components/note-lock-item";

export const NoteMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="square" variant="ghost">
          <EllipsisVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <NoteLockItem />
        <NoteDeleteItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
