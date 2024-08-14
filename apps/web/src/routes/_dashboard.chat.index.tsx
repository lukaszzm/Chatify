import { Container } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

import { ChatSidebar } from "@/features/chat";
import { useMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/_dashboard/chat/")({
  component: ChatIndexPage,
});

function ChatIndexPage() {
  const isMobile = useMobile();

  if (isMobile) {
    return <ChatSidebar />;
  }

  return (
    <Container variant="ghost" className="flex items-center justify-center">
      <p className="text-center text-muted-foreground">
        Select chat to start conversation.
      </p>
    </Container>
  );
}
