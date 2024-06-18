import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/notes")({
  component: NotesPage,
});

function NotesPage() {
  return <h1>Hello from notes!</h1>;
}
