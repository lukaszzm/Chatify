import { ScrollArea } from "@chatify/ui";

import { ErrorAlert } from "@/components/errors/error-alert";
import { NotesItem } from "@/features/notes/components/notes-item";
import { NotesListSkeleton } from "@/features/notes/components/skeletons/notes-list-skeleton";
import { useNotesQuery } from "@/features/notes/hooks/use-notes-query";

export const NotesList = () => {
  const [{ data, fetching, error }] = useNotesQuery();

  if (fetching) {
    return <NotesListSkeleton />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!data || data.notes.length === 0) {
    return (
      <p className="text-sm text-muted-foreground/80 text-center py-4">
        No notes found. Create a new note to get started.
      </p>
    );
  }

  return (
    <ScrollArea className="h-[calc(100dvh-7rem)]">
      <div className="space-y-2">
        {data.notes.map((note) => (
          <NotesItem key={note.id} {...note} />
        ))}
      </div>
    </ScrollArea>
  );
};
