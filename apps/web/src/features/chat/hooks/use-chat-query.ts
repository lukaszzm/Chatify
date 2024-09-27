import { useQuery } from "urql";

import { CHAT_QUERY } from "@/graphql/queries/chat";

export const useChatQuery = (id: string) => {
  const [{ data, fetching, error }] = useQuery({
    query: CHAT_QUERY,
    variables: { id },
  });

  return {
    data: data?.chat,
    fetching,
    error,
  };
};
