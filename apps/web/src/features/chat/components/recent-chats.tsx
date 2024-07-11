import { SidebarInfo, SidebarList } from "@chatify/ui";

import { ErrorAlert } from "@/components/errors/error-alert";
import { ChatPreview } from "@/features/chat/components/chat-preview";
import { ChatListSkeleton } from "@/features/chat/components/skeletons/chat-list-skeleton";
import { useRecentChats } from "@/features/chat/hooks/use-recent-chats";

export const RecentChats = () => {
  const [{ data, fetching, error }] = useRecentChats();

  if (fetching) {
    return <ChatListSkeleton />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!data || data.recentChats.length === 0) {
    return (
      <SidebarInfo>No chats yet. Start conversation by searching a user.</SidebarInfo>
    );
  }

  return (
    <SidebarList>
      {data.recentChats.map(({ id, recentMessage }) => (
        <ChatPreview
          key={id}
          id={id}
          createdAt={recentMessage.createdAt}
          firstName={recentMessage.sender.firstName}
          lastName={recentMessage.sender.lastName}
          message={recentMessage.content}
        />
      ))}
    </SidebarList>
  );
};
