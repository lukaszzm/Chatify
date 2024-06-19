import { Badge, Container, Separator } from "@chatify/ui";
import { notFound } from "@tanstack/react-router";

import { ErrorAlert } from "@/components/errors/error-alert";
import { NoteSkeleton } from "@/features/notes/components/skeletons/note-skeleton";
import { useNote } from "@/features/notes/hooks/use-note";
import { formatDate } from "@/utils/format-date";

interface NoteProps {
  id: string;
}

export const Note = ({ id }: NoteProps) => {
  const [result] = useNote(id);
  const { data, fetching, error } = result;

  if (fetching) {
    return <NoteSkeleton />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!data?.note) {
    notFound();
    return;
  }

  const note = data.note;

  return (
    <Container className="p-4 space-y-2">
      <div className="flex gap-2">
        <Badge>Created {formatDate(note.createdAt)}</Badge>
        <Badge variant="secondary">Last updated {formatDate(note.createdAt)}</Badge>
      </div>
      <h1 className="text-2xl font-semibold ">{note.title}</h1>
      <Separator />
      <p className="text-base text-muted-foreground">{note.content}</p>
    </Container>
  );
};
