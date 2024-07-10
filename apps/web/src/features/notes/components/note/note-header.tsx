import { Badge } from "@chatify/ui";

import { NoteMenu } from "@/features/notes/components/note/note-menu";
import { NoteTitle } from "@/features/notes/components/note/note-title";
import { useNote } from "@/features/notes/hooks/use-note";
import { formatDate } from "@/utils/format-date";

export const NoteHeader = () => {
  const { updatedAt } = useNote();

  return (
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <Badge>Updated {formatDate(updatedAt)}</Badge>
        <NoteTitle />
      </div>
      <NoteMenu />
    </div>
  );
};
