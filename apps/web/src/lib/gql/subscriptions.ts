import { graphql } from "@/gql";

export const RECENT_CHATS_SUBSCRIPTION = graphql(`
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

export const MESSAGES_SUBSCRIPTION = graphql(`
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
