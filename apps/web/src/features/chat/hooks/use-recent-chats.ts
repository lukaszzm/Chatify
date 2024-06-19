import { useQuery } from "urql";

import { graphql } from "@/gql";

const RecentChatsQuery = graphql(`
  query RecentChats {
    recentChats {
      id
      recentMessage {
        content
        createdAt
        sender {
          firstName
          lastName
        }
      }
    }
  }
`);

export const useRecentChats = () => {
  return useQuery({
    query: RecentChatsQuery,
  });
};
