import { DropdownMenuItem } from "@chatify/ui";
import { LockOpen } from "lucide-react";

export const NoteLockItem = () => {
  return (
    <DropdownMenuItem flex>
      <LockOpen size={16} />
      <span>Unlock</span>
    </DropdownMenuItem>
  );
};
