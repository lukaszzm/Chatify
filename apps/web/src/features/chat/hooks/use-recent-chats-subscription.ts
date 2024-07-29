import { useSubscription } from "urql";

import { useRecentChatsQuery } from "@/features/chat/hooks/use-recent-chats-query";
import { graphql } from "@/gql";

const RecentChatsSubscription = graphql(`
  subscription ChatUpdated {
    chatUpdated {
      id
      title
      participants {
        firstName
        lastName
        id
      }
      latestMessage {
        id
        sender {
          id
          firstName
        }
        content
        createdAt
      }
    }
  }
`);

type ChatPreview = {
  id: string;
  title?: string | null;
  participants: {
    firstName: string;
    lastName: string;
    id: string;
  }[];
  latestMessage: {
    id: string;
    sender: {
      id: string;
      firstName: string;
    };
    content: string;
    createdAt: string;
  };
};

export const useRecentChatsSubscription = () => {
  const [queryResult] = useRecentChatsQuery();

  const [subResult] = useSubscription(
    {
      query: RecentChatsSubscription,
      pause: queryResult.fetching,
    },
    (
      chats: ChatPreview[] = queryResult.data?.recentChats ?? [],
      response: { chatUpdated: ChatPreview }
    ) => {
      const chatWithoutUpdated = chats.filter((el) => el.id !== response.chatUpdated.id);
      return [response.chatUpdated, ...chatWithoutUpdated];
    }
  );

  return [
    {
      data: subResult.data || queryResult.data?.recentChats,
      fetching: queryResult.fetching,
      error: subResult.error || queryResult.error,
    },
  ];
};
