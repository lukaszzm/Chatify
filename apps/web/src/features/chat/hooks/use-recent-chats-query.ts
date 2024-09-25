import type { RequestPolicy } from "urql";
import { useQuery } from "urql";

import { RECENT_CHATS_QUERY } from "@/lib/gql/queries";

interface UseRecentChatsOptions {
  after?: string | null;
  pause?: boolean;
  requestPolicy?: RequestPolicy;
}

export const useRecentChatsQuery = (options?: UseRecentChatsOptions) => {
  const { after, pause, requestPolicy } = options ?? {};

  return useQuery({
    query: RECENT_CHATS_QUERY,
    variables: { after },
    pause,
    requestPolicy,
  });
};
