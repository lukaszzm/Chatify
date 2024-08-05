import { ErrorComponent, SidebarInfo, SidebarList } from "@chatify/ui";

import { ChatPreview } from "@/features/chat/components/chat-preview";
import { MoreRecentChats } from "@/features/chat/components/more-recent-chats";
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

  if (!data?.recentChats || data.recentChats.edges.length === 0) {
    return <SidebarInfo>No chat history</SidebarInfo>;
  }

  return (
    <SidebarList>
      {data.recentChats.edges.map((chat) => (
        <ChatPreview key={chat.id} message={chat.latestMessage} {...chat} />
      ))}

      {data.recentChats.pageInfo.hasNextPage && (
        <MoreRecentChats cursor={data.recentChats.pageInfo.endCursor} />
      )}
    </SidebarList>
  );
};
