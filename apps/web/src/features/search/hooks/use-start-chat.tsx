import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useMutation } from "urql";

import { graphql } from "@/gql";

const StartChatMutation = graphql(`
  mutation StartChat($data: StartChatInput!) {
    startChat(data: $data) {
      id
    }
  }
`);

export const useStartChat = () => {
  const [{ fetching }, startChatMutation] = useMutation(StartChatMutation);
  const navigate = useNavigate();

  const startChat = async (id: string) => {
    const { data, error } = await startChatMutation({ data: { participants: [id] } });

    if (data?.startChat.id) {
      await navigate({
        to: "/chat/$chatId",
        params: { chatId: data.startChat.id },
      });
    }

    if (error) {
      toast.error("Failed to start chat, please try again later.");
    }
  };

  return {
    startChat,
    fetching,
  };
};
