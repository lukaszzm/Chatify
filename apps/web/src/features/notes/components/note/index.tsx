import { Container, Separator } from "@chatify/ui";
import { notFound } from "@tanstack/react-router";

import { ErrorAlert } from "@/components/errors/error-alert";
import { NoteContent } from "@/features/notes/components/note/note-content";
import { NoteHeader } from "@/features/notes/components/note/note-header";
import { NoteSkeleton } from "@/features/notes/components/skeletons/note-skeleton";
import { NoteProvider } from "@/features/notes/contexts/note-context";
import { useNoteQuery } from "@/features/notes/hooks/use-note-query";

interface NoteProps {
  id: string;
}

export const Note = ({ id }: NoteProps) => {
  const [result] = useNoteQuery(id);
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
    <Container className="p-4 space-y-2 flex flex-col">
      <NoteProvider note={note}>
        <NoteHeader />
        <Separator />
        <NoteContent />
      </NoteProvider>
    </Container>
  );
};
