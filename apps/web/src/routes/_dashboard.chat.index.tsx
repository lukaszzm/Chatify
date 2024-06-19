import { Container } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/chat/")({
  component: ChatIndexPage,
});

function ChatIndexPage() {
  return (
    <Container variant="ghost" className="flex justify-center items-center">
      <p className="text-muted-foreground text-center">
        Select chat to start conversation.
      </p>
    </Container>
  );
}
