import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "urql";

import type { SendMessageValues } from "@/features/chat/schemas/send-message-schema";
import { sendMessageSchema } from "@/features/chat/schemas/send-message-schema";
import { SEND_MESSAGE_MUTATION } from "@/lib/gql/mutations";

export const useSendMessage = (chatId: string) => {
  const form = useForm<SendMessageValues>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      content: "",
    },
  });
  const [, sendMessageMutation] = useMutation(SEND_MESSAGE_MUTATION);

  const sendMessage = form.handleSubmit(async ({ content }) => {
    form.reset();
    const { error } = await sendMessageMutation({ data: { chatId, content } });

    if (error) {
      toast.error("Failed to send message, please try again later.");
    }
  });

  return {
    form,
    sending: form.formState.isSubmitting,
    sendMessage,
  };
};
