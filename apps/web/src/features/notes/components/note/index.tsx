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
  const [{ data, fetching, error }] = useNoteQuery(id);

  if (fetching) {
    return <NoteSkeleton />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!data) {
    notFound();
    return;
  }

  return (
    <Container className="p-4 space-y-2 flex flex-col">
      <NoteProvider note={data.note}>
        <NoteHeader />
        <Separator />
        <NoteContent />
      </NoteProvider>
    </Container>
  );
};
