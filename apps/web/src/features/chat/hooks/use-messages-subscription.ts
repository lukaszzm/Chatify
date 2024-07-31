import { useSubscription } from "urql";

import { useMessagesQuery } from "@/features/chat/hooks/use-messages-query";
import type { MessageSentSubscription } from "@/gql/graphql";
import { MESSAGES_SUBSCRIPTION } from "@/lib/gql/subscriptions";

export const useMessagesSubscription = (chatId: string) => {
  const [queryResult] = useMessagesQuery(chatId);

  const [subResult] = useSubscription(
    {
      query: MESSAGES_SUBSCRIPTION,
      variables: { chatId },
      pause: queryResult.fetching,
    },
    (
      messages: MessageSentSubscription["messageSent"][] = queryResult.data?.messages ??
        [],
      response
    ) => [...messages, response.messageSent]
  );

  return [
    {
      data: subResult.data || queryResult.data?.messages,
      fetching: queryResult.fetching,
      error: subResult.error || queryResult.error,
    },
  ];
};
