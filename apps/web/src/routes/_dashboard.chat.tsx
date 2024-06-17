import { SearchInput } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

import { Chat, ChatList } from "@/features/chat";

const ChatPage = () => {
  return (
    <>
      <div className="bg-background p-4 rounded-md space-y-4 w-full max-w-xs">
        <SearchInput placeholder="Search" />
        <h1 className="text-2xl">Chats</h1>
        <ChatList />
      </div>
      <Chat />
    </>
  );
};

export const Route = createFileRoute("/_dashboard/chat")({
  component: ChatPage,
});
