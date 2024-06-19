import { createFileRoute } from "@tanstack/react-router";

import { Note } from "@/features/notes";

export const Route = createFileRoute("/_dashboard/notes/$noteId")({
  component: NoteByIdPage,
});

function NoteByIdPage() {
  const { noteId } = Route.useParams();

  return <Note id={noteId} />;
}
