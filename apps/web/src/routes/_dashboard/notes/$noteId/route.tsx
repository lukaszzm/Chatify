import { createFileRoute } from "@tanstack/react-router";

import { Note } from "@/features/notes/components/note";

export const Route = createFileRoute("/_dashboard/notes/$noteId")({
  component: Page,
});

function Page() {
  const { noteId } = Route.useParams();

  return <Note id={noteId} />;
}
