import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useMutation } from "urql";

import { START_CHAT_MUTATION } from "@/lib/gql/mutations";

export const useStartChat = () => {
  const [{ fetching }, startChatMutation] = useMutation(START_CHAT_MUTATION);
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
