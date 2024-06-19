import { createFileRoute } from "@tanstack/react-router";

import { Chat } from "@/features/chat";

export const Route = createFileRoute("/_dashboard/chat/$chatId")({
  component: ChatByIdPage,
});

function ChatByIdPage() {
  return <Chat />;
}
