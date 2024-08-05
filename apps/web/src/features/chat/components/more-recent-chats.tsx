import { Button } from "@chatify/ui";
import { useState } from "react";

import { ChatPreview } from "@/features/chat/components/chat-preview";
import { RecentChatsLoading } from "@/features/chat/components/recent-chats-loading";
import { useRecentChatsQuery } from "@/features/chat/hooks/use-recent-chats-query";

interface MoreRecentChatsProps {
  cursor?: string | null;
}

export const MoreRecentChats = ({ cursor }: MoreRecentChatsProps) => {
  const [isPaused, setPaused] = useState(true);
  const [{ data, fetching, error }] = useRecentChatsQuery({
    after: cursor,
    pause: isPaused,
  });

  if (isPaused) {
    return <Button onClick={() => setPaused(false)}>Load more</Button>;
  }

  if (fetching) {
    return <RecentChatsLoading />;
  }

  if (!data || error) {
    return null;
  }

  return (
    <>
      {data.recentChats.edges.map((chat) => (
        <ChatPreview key={chat.id} message={chat.latestMessage} {...chat} />
      ))}

      {data.recentChats.pageInfo.hasNextPage && (
        <MoreRecentChats cursor={data.recentChats.pageInfo.endCursor} />
      )}
    </>
  );
};
