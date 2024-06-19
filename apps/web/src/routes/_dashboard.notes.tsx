import { Container } from "@chatify/ui";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/notes")({
  component: NotesPage,
});

function NotesPage() {
  return (
    <>
      <Container size="sm" className="space-y-4 p-4">
        <h1 className="text-2xl">Notes</h1>
      </Container>
      <Outlet />
    </>
  );
}
