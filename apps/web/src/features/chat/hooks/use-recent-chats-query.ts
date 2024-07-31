import { useQuery } from "urql";

import { RECENT_CHATS_QUERY } from "@/lib/gql/queries";

export const useRecentChatsQuery = () => {
  return useQuery({
    query: RECENT_CHATS_QUERY,
  });
};
