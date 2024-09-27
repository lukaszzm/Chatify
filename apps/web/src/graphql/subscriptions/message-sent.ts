import { graphql } from "@/generated";

export const MESSAGE_SENT_SUBSCRIPTION = graphql(`
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
