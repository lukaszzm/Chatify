import { Container } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/chat/")({
  component: ChatIndexPage,
});

function ChatIndexPage() {
  return (
    <Container variant="ghost" className="flex items-center justify-center">
      <p className="text-center text-muted-foreground">
        Select chat to start conversation.
      </p>
    </Container>
  );
}
