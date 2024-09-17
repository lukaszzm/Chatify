import { createFileRoute } from "@tanstack/react-router";

import { Chat } from "@/features/chat/components/chat";

export const Route = createFileRoute("/_dashboard/chat/$chatId")({
  component: Page,
});

function Page() {
  const { chatId } = Route.useParams();

  return <Chat id={chatId} />;
}
