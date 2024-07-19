import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "urql";

import type { NewMessageValues } from "@/features/chat/schemas/new-message-schema";
import { newMessageSchema } from "@/features/chat/schemas/new-message-schema";
import { graphql } from "@/gql";

const SendMessageMutation = graphql(`
  mutation SendMessage($data: SendMessageInput!) {
    sendMessage(data: $data) {
      id
    }
  }
`);

export const useNewMessage = (chatId: string) => {
  const form = useForm<NewMessageValues>({
    resolver: zodResolver(newMessageSchema),
    defaultValues: {
      content: "",
    },
  });
  const [, sendMessageMutation] = useMutation(SendMessageMutation);

  const sendMessage = form.handleSubmit(async ({ content }) => {
    const { error } = await sendMessageMutation({ data: { chatId, content } });

    if (error) {
      toast.error("Failed to send message, please try again later.");
      return;
    }

    form.reset();
  });

  return {
    form,
    sending: form.formState.isSubmitting,
    sendMessage,
  };
};
