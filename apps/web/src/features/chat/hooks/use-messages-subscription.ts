import { useSubscription } from "urql";

import { useMessagesQuery } from "@/features/chat/hooks/use-messages-query";
import { MESSAGE_SENT_SUBSCRIPTION } from "@/graphql/subscriptions/message-sent";

export const useMessagesSubscription = (chatId: string) => {
  const [queryResult] = useMessagesQuery({ chatId });

  useSubscription({
    query: MESSAGE_SENT_SUBSCRIPTION,
    variables: { chatId },
    pause: queryResult.fetching,
  });

  return [queryResult];
};
