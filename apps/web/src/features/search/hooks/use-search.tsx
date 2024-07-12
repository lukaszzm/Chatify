import { useQuery } from "urql";

import { graphql } from "@/gql";

const SearchUsersQuery = graphql(`
  query SearchUsers(
    $pagination: PaginationInput!
    $where: UserWhereInput!
    $excludeMe: Boolean!
  ) {
    users(where: $where, pagination: $pagination, excludeMe: $excludeMe) {
      id
      firstName
      lastName
    }
  }
`);

export const useSearch = (phrase: string) => {
  return useQuery({
    query: SearchUsersQuery,
    variables: {
      pagination: {
        take: 3,
      },
      where: {
        fullName: phrase,
      },
      excludeMe: false,
    },
  });
};
