import { graphql } from "@/generated";

export const SEND_MESSAGE_MUTATION = graphql(`
  mutation SendMessage($data: SendMessageInput!) {
    sendMessage(data: $data) {
      id
    }
  }
`);
