import { Lock, Unlock } from "lucide-react";

import { useNote } from "@/features/notes/hooks/use-note";

const iconClassName = "text-muted-foreground size-4 mt-0.5";

export const NoteTitle = () => {
  const { title, isLocked } = useNote();

  return (
    <div className="flex gap-1.5">
      <h1 className="text-3xl font-semibold">{title}</h1>
      {isLocked ? (
        <Lock className={iconClassName} />
      ) : (
        <Unlock className={iconClassName} />
      )}
    </div>
  );
};
