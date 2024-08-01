import { useQuery } from "urql";

import { MESSAGES_QUERY } from "@/lib/gql/queries";

export const useMessagesQuery = (chatId: string) => {
  return useQuery({
    query: MESSAGES_QUERY,
    variables: { chatId },
    requestPolicy: "cache-and-network",
  });
};
