import { Badge } from "@chatify/ui";

import { NoteMenu } from "@/features/notes/components/note/note-menu";
import { useNote } from "@/features/notes/hooks/use-note";
import { formatDate } from "@/utils/format-date";

export const NoteHeader = () => {
  const { createdAt, title } = useNote();

  return (
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <Badge>Created {formatDate(createdAt)}</Badge>
        <h1 className="text-3xl font-semibold">{title}</h1>
      </div>
      <NoteMenu />
    </div>
  );
};
