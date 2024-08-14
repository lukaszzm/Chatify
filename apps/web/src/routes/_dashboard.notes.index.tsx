import { Container } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

import { NoteSidebar } from "@/features/notes";
import { useMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/_dashboard/notes/")({
  component: NotesIndexPage,
});

function NotesIndexPage() {
  const isMobile = useMobile();

  if (isMobile) {
    return <NoteSidebar />;
  }

  return (
    <Container variant="ghost" className="flex items-center justify-center">
      <p className="text-center text-muted-foreground">Select note to show details.</p>
    </Container>
  );
}
