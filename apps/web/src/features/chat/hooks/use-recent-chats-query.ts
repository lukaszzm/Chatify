import { useQuery } from "urql";

import { graphql } from "@/gql";

const RecentChatsQuery = graphql(`
  query RecentChats {
    recentChats {
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

export const useRecentChatsQuery = () => {
  return useQuery({
    query: RecentChatsQuery,
  });
};
