import { useQuery } from "urql";

import { SEARCH_USERS_QUERY } from "@/lib/gql/queries";

export const useSearch = (phrase: string) => {
  return useQuery({
    query: SEARCH_USERS_QUERY,
    variables: {
      where: {
        fullName: phrase,
      },
      excludeMe: true,
    },
  });
};
