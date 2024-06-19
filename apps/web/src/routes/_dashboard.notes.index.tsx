import { Container } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/notes/")({
  component: NotesIndexPage,
});

function NotesIndexPage() {
  return (
    <Container variant="ghost" className="flex justify-center items-center">
      <p className="text-muted-foreground text-center">Select note to show details.</p>
    </Container>
  );
}
