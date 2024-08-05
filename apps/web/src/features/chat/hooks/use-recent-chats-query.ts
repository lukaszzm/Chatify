import { useQuery } from "urql";

import { RECENT_CHATS_QUERY } from "@/lib/gql/queries";

interface UseRecentChatsProps {
  first?: number;
  after?: string | null;
  pause?: boolean;
}

export const useRecentChatsQuery = ({ first = 1, after, pause }: UseRecentChatsProps) => {
  return useQuery({
    query: RECENT_CHATS_QUERY,
    variables: { first, after },
    pause,
    requestPolicy: "cache-and-network",
  });
};
