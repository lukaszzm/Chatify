import { useQuery } from "urql";

import { CHAT_QUERY } from "@/lib/gql/queries";

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
