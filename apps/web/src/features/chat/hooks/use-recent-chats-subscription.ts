import { useSubscription } from "urql";

import { useRecentChatsQuery } from "@/features/chat/hooks/use-recent-chats-query";
import type { ChatUpdatedSubscription } from "@/gql/graphql";
import { RECENT_CHATS_SUBSCRIPTION } from "@/lib/gql/subscriptions";

export const useRecentChatsSubscription = () => {
  const [queryResult] = useRecentChatsQuery();

  const [subResult] = useSubscription(
    {
      query: RECENT_CHATS_SUBSCRIPTION,
      pause: queryResult.fetching,
    },
    (
      chats: ChatUpdatedSubscription["chatUpdated"][] = queryResult.data?.recentChats ??
        [],
      response: ChatUpdatedSubscription
    ) => {
      const chatWithoutUpdated = chats.filter((el) => el.id !== response.chatUpdated.id);
      return [response.chatUpdated, ...chatWithoutUpdated];
    }
  );

  return [
    {
      data: subResult.data || queryResult.data?.recentChats,
      fetching: queryResult.fetching,
      error: subResult.error || queryResult.error,
    },
  ];
};
