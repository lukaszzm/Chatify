import { Container, ErrorComponent, NotFoundComponent, Separator } from "@chatify/ui";

import { NoteContent } from "@/features/notes/components/note-content";
import { NoteHeader } from "@/features/notes/components/note-header";
import { NoteLoading } from "@/features/notes/components/note-loading";
import { NoteProvider } from "@/features/notes/contexts/note-context";
import { useNoteQuery } from "@/features/notes/hooks/use-note-query";
import type { Note as GqlNote } from "@/generated/graphql";

interface NoteProps extends Pick<GqlNote, "id"> {}

export const Note = ({ id }: NoteProps) => {
  const [{ data, fetching, error }] = useNoteQuery(id);

  if (fetching) {
    return <NoteLoading />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  if (!data?.note) {
    return <NotFoundComponent text="Note not found" />;
  }

  return (
    <Container className="flex flex-col space-y-2 p-4">
      <NoteProvider note={data.note}>
        <NoteHeader />
        <Separator />
        <NoteContent />
      </NoteProvider>
    </Container>
  );
};
