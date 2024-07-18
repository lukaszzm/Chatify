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
  return useQuery({
    query: ChatQuery,
    variables: { id },
  });
};
