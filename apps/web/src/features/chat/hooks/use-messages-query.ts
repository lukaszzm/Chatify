import type { RequestPolicy } from "urql";
import { useQuery } from "urql";

import { MESSAGES_QUERY } from "@/lib/gql/queries";

interface UseMessagesQueryProps {
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
}: UseMessagesQueryProps) => {
  return useQuery({
    query: MESSAGES_QUERY,
    variables: { chatId, after },
    pause,
    requestPolicy,
  });
};
