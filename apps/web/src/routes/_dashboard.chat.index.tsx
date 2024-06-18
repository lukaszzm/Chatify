import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/chat/")({
  component: ChatIndexPage,
});

function ChatIndexPage() {
  return (
    <div className="w-full flex justify-center items-center p-4">
      <p className="text-muted-foreground">Select chat to start conversation.</p>
    </div>
  );
}
