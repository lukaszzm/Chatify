import { useSubscription } from "urql";

import { useRecentChatsQuery } from "@/features/chat/hooks/use-recent-chats-query";
import { CHAT_UPDATED_SUBSCRIPTION } from "@/graphql/subscriptions/chat-updated";

export const useRecentChatsSubscription = () => {
  const [queryResult] = useRecentChatsQuery();

  useSubscription({
    query: CHAT_UPDATED_SUBSCRIPTION,
    pause: queryResult.fetching,
  });

  return [queryResult];
};
