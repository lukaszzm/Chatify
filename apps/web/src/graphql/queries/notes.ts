import { graphql } from "@/generated";

export const NOTES_QUERY = graphql(`
  query Notes($after: String, $first: Int) {
    notes(after: $after, first: $first) {
      edges {
        cursor
        node {
          id
          title
          content
          updatedAt
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);
