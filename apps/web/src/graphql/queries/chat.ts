import { graphql } from "@/generated";

export const CHAT_QUERY = graphql(`
  query Chat($id: String!) {
    chat(id: $id) {
      id
      type
      participants {
        id
        profilePicture
        firstName
        lastName
      }
    }
  }
`);
