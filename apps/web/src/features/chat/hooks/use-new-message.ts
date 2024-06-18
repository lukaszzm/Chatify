import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { NewMessageValues } from "@/features/chat/schemas/new-message-schema";
import { newMessageSchema } from "@/features/chat/schemas/new-message-schema";

export const useNewMessage = () => {
  const form = useForm<NewMessageValues>({
    resolver: zodResolver(newMessageSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = form.handleSubmit((_values) => {});

  return {
    form,
    onSubmit,
  };
};
