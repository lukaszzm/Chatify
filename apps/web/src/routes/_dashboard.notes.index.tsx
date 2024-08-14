import { Container } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/notes/")({
  component: NotesIndexPage,
});

function NotesIndexPage() {
  return (
    <Container variant="ghost" className="flex items-center justify-center">
      <p className="text-center text-muted-foreground">Select note to show details.</p>
    </Container>
  );
}
