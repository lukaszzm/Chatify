import { Subtitle } from "@chatify/ui";
import { Lock, Unlock } from "lucide-react";

import { useNote } from "@/features/notes/hooks/use-note";

const iconClassName = "text-muted-foreground size-4 mt-0.5";

export const NoteTitle = () => {
  const { title, isLocked } = useNote();

  return (
    <div className="flex gap-1.5">
      <Subtitle>{title}</Subtitle>
      {isLocked ? (
        <Lock className={iconClassName} />
      ) : (
        <Unlock className={iconClassName} />
      )}
    </div>
  );
};
