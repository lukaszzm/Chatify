import { useMutation } from "urql";

import { graphql } from "@/gql";

const SearchUsersMutation = graphql(`
  mutation SearchUsers($data: SearchUsersInput!) {
    searchUsers(data: $data) {
      id
      firstName
      lastName
    }
  }
`);

// Add search functionality
export const useSearch = () => {
  const [, searchUsersMutation] = useMutation(SearchUsersMutation);

  const searchUsers = async (phrase: string) => {
    const { error } = await searchUsersMutation({ data: { phrase } });

    if (error) {
      return;
    }
  };

  return {
    searchUsers,
  };
};
