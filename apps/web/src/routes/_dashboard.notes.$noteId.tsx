import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/notes/$noteId")({
  component: () => <div>Hello /_dashboard/notes/$noteId!</div>,
});
