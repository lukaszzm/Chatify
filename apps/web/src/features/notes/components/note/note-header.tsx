import { Badge } from "@chatify/ui";

import { BackButton } from "@/components/back-button";
import { NoteMenu } from "@/features/notes/components/note/note-menu";
import { NoteTitle } from "@/features/notes/components/note/note-title";
import { useNote } from "@/features/notes/hooks/use-note";
import { formatDate } from "@/utils/format-date";

export const NoteHeader = () => {
  const { updatedAt } = useNote();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <BackButton variant="ghost" to="/notes" />
        <div className="space-y-2">
          <Badge>Updated {formatDate(updatedAt)}</Badge>
          <NoteTitle />
        </div>
      </div>
      <NoteMenu />
    </div>
  );
};
