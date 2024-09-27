import type { RequestPolicy } from "urql";
import { useQuery } from "urql";

import { MESSAGES_QUERY } from "@/graphql/queries/messages";

interface UseMessagesQueryOptions {
  chatId: string;
  after?: string | null;
  pause?: boolean;
  requestPolicy?: RequestPolicy;
}

export const useMessagesQuery = ({
  chatId,
  after,
  pause,
  requestPolicy,
}: UseMessagesQueryOptions) => {
  return useQuery({
    query: MESSAGES_QUERY,
    variables: { chatId, after },
    pause,
    requestPolicy,
  });
};
