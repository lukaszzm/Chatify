import { ErrorComponent, SidebarInfo, SidebarList } from "@chatify/ui";

import { RecentChatsItem } from "@/features/chat/components/recent-chats-item";
import { RecentChatsLoading } from "@/features/chat/components/recent-chats-loading";
import { RecentChatsMore } from "@/features/chat/components/recent-chats-more";
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
      {data.recentChats.edges.map((edge) => (
        <RecentChatsItem key={edge.node.id} {...edge.node} />
      ))}

      {data.recentChats.pageInfo.hasNextPage && (
        <RecentChatsMore cursor={data.recentChats.pageInfo.endCursor} />
      )}
    </SidebarList>
  );
};
