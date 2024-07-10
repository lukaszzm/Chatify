import { Outlet, createFileRoute } from "@tanstack/react-router";

import { ChatSidebar } from "@/features/chat";

export const Route = createFileRoute("/_dashboard/chat")({
  component: ChatRootPage,
});

function ChatRootPage() {
  return (
    <>
      <ChatSidebar />
      <Outlet />
    </>
  );
}
