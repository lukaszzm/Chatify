import type { RequestPolicy } from "urql";
import { useQuery } from "urql";

import { RECENT_CHATS_QUERY } from "@/lib/gql/queries";

interface UseRecentChatsProps {
  after?: string | null;
  pause?: boolean;
  requestPolicy?: RequestPolicy;
}

export const useRecentChatsQuery = ({
  after,
  pause,
  requestPolicy,
}: UseRecentChatsProps) => {
  return useQuery({
    query: RECENT_CHATS_QUERY,
    variables: { after },
    pause,
    requestPolicy,
  });
};
