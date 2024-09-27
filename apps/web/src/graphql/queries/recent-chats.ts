import { graphql } from "@/generated";

export const RECENT_CHATS_QUERY = graphql(`
  query RecentChats($after: String, $first: Int) {
    recentChats(after: $after, first: $first) {
      edges {
        cursor
        node {
          id
          type
          participants {
            firstName
            lastName
            profilePicture
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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);
