import { graphql } from "@/generated";

export const START_CHAT_MUTATION = graphql(`
  mutation StartChat($data: StartChatInput!) {
    startChat(data: $data) {
      id
    }
  }
`);
