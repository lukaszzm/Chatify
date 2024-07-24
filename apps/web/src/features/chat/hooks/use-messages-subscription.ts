import { useSubscription } from "urql";

import { useMessagesQuery } from "@/features/chat/hooks/use-messages-query";
import { graphql } from "@/gql";

const MessagesSubscription = graphql(`
  subscription MessageSent($chatId: String!) {
    messageSent(chatId: $chatId) {
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

type Message = {
  id: string;
  content: string;
  createdAt: string;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
  };
};

export const useMessagesSubscription = (chatId: string) => {
  const [queryResult] = useMessagesQuery(chatId);

  const [subResult] = useSubscription(
    {
      query: MessagesSubscription,
      variables: { chatId },
      pause: queryResult.fetching,
    },
    (messages: Message[] = queryResult.data?.messages ?? [], response) => [
      ...messages,
      response.messageSent,
    ]
  );

  return [
    {
      data: subResult.data || queryResult.data?.messages,
      fetching: queryResult.fetching,
      error: subResult.error || queryResult.error,
    },
  ];
};
