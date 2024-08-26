import { graphql } from "@/gql";

export const RECENT_CHATS_SUBSCRIPTION = graphql(`
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

export const MESSAGES_SUBSCRIPTION = graphql(`
  subscription MessageSent($chatId: String!) {
    messageSent(chatId: $chatId) {
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
`);
