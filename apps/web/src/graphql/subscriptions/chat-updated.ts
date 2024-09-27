import { graphql } from "@/generated";

export const CHAT_UPDATED_SUBSCRIPTION = graphql(`
  subscription ChatUpdated {
    chatUpdated {
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
`);
