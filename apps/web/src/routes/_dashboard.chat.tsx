import { SearchInput } from "@chatify/ui";
import { Outlet, createFileRoute } from "@tanstack/react-router";

import { ChatList } from "@/features/chat";

export const Route = createFileRoute("/_dashboard/chat")({
  component: ChatRootPage,
});

function ChatRootPage() {
  return (
    <>
      <div className="bg-background p-4 rounded-md space-y-4 w-full max-w-xs">
        <SearchInput placeholder="Search" />
        <h1 className="text-2xl">Chats</h1>
        <ChatList />
      </div>
      <Outlet />
    </>
  );
}
