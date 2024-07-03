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

  if (!data) {
    return <p>No notes.</p>;
  }

  return (
    <div className="space-y-2">
      {data.notes.map((note) => (
        <NotesItem key={note.id} {...note} />
      ))}
    </div>
  );
};
