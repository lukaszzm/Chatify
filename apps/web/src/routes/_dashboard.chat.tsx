import { Container, SearchInput } from "@chatify/ui";
import { Outlet, createFileRoute } from "@tanstack/react-router";

import { ChatList } from "@/features/chat";

export const Route = createFileRoute("/_dashboard/chat")({
  component: ChatRootPage,
});

function ChatRootPage() {
  return (
    <>
      <Container size="sm" className="space-y-4 p-4">
        <SearchInput placeholder="Search" />
        <h1 className="text-2xl">Chats</h1>
        <ChatList />
      </Container>
      <Outlet />
    </>
  );
}
