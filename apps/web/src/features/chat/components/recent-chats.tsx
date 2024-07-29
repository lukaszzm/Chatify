import { ErrorComponent, SidebarInfo, SidebarList } from "@chatify/ui";

import { ChatPreview } from "@/features/chat/components/chat-preview";
import { RecentChatsLoading } from "@/features/chat/components/recent-chats-loading";
import { useRecentChatsSubscription } from "@/features/chat/hooks/use-recent-chats-subscription";

export const RecentChats = () => {
  const [{ data, fetching, error }] = useRecentChatsSubscription();

  if (fetching) {
    return <RecentChatsLoading />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  if (!data || data.length === 0) {
    return <SidebarInfo>No chat history</SidebarInfo>;
  }

  return (
    <SidebarList>
      {data.map((chat) => (
        <ChatPreview key={chat.id} message={chat.latestMessage} {...chat} />
      ))}
    </SidebarList>
  );
};
