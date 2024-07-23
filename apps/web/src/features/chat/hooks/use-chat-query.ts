import { useQuery } from "urql";

import { graphql } from "@/gql";

const ChatQuery = graphql(`
  query Chat($id: String!) {
    chat(id: $id) {
      id
      title
      participants {
        id
        firstName
        lastName
      }
    }
  }
`);

export const useChatQuery = (id: string) => {
  const [{ data, fetching, error }] = useQuery({
    query: ChatQuery,
    variables: { id },
  });

  return {
    data: data?.chat,
    fetching,
    error,
  };
};
