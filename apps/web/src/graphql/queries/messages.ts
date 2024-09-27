import { graphql } from "@/generated";

export const MESSAGES_QUERY = graphql(`
  query Messages($chatId: String!, $after: String, $first: Int) {
    messages(chatId: $chatId, after: $after, first: $first) {
      edges {
        cursor
        node {
          id
          content
          createdAt
          sender {
            id
            profilePicture
            firstName
            lastName
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
