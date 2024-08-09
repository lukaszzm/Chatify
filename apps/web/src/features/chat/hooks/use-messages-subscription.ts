import { useSubscription } from "urql";

import { useMessagesQuery } from "@/features/chat/hooks/use-messages-query";
import { MESSAGES_SUBSCRIPTION } from "@/lib/gql/subscriptions";

export const useMessagesSubscription = (chatId: string) => {
  const [queryResult] = useMessagesQuery({ chatId });

  useSubscription({
    query: MESSAGES_SUBSCRIPTION,
    variables: { chatId },
    pause: queryResult.fetching,
  });

  return [queryResult];
};
