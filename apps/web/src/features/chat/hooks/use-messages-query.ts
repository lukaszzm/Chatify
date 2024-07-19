import { useQuery } from "urql";

import { graphql } from "@/gql";

const MessagesQuery = graphql(`
  query Messages($chatId: String!) {
    messages(chatId: $chatId) {
      id
      content
      createdAt
      sender {
        id
        firstName
        lastName
      }
    }
  }
`);

export const useMessagesQuery = (chatId: string) => {
  const [{ data, fetching, error }] = useQuery({
    query: MessagesQuery,
    variables: { chatId },
  });

  return {
    data: data?.messages,
    fetching,
    error,
  };
};
