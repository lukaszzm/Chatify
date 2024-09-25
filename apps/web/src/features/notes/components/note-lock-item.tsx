import { DropdownMenuItem } from "@chatify/ui";
import { LockOpen, Lock } from "lucide-react";

import { useNote } from "@/features/notes/hooks/use-note";

export const NoteLockItem = () => {
  const { isLocked, toggleLock, id } = useNote();

  const clickHandler = () => toggleLock(id);

  if (isLocked) {
    return (
      <DropdownMenuItem flex onClick={clickHandler}>
        <Lock size={16} />
        <span>Unlock</span>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem flex onClick={clickHandler}>
      <LockOpen size={16} />
      <span>Lock</span>
    </DropdownMenuItem>
  );
};
