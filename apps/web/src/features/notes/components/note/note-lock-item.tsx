import { DropdownMenuItem } from "@chatify/ui";
import { LockOpen, Lock } from "lucide-react";

import { useNote } from "@/features/notes/hooks/use-note";

export const NoteLockItem = () => {
  const { editable, toggleEditable } = useNote();

  if (editable) {
    return (
      <DropdownMenuItem flex onClick={toggleEditable}>
        <LockOpen size={16} />
        <span>Lock</span>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem flex onClick={toggleEditable}>
      <Lock size={16} />
      <span>Unlock</span>
    </DropdownMenuItem>
  );
};
