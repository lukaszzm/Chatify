import { useSubscription } from "urql";

import { useRecentChatsQuery } from "@/features/chat/hooks/use-recent-chats-query";
import { RECENT_CHATS_SUBSCRIPTION } from "@/lib/gql/subscriptions";

export const useRecentChatsSubscription = () => {
  const [queryResult] = useRecentChatsQuery({});

  useSubscription({
    query: RECENT_CHATS_SUBSCRIPTION,
    pause: queryResult.fetching,
  });

  return [queryResult];
};
