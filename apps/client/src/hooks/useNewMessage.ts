import { useReactQuerySubscription } from "./useReactQuerySubscription";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewMessageSchema } from "../schemas";
import type { MessageForm } from "../interfaces/Message";
import { useState } from "react";

export const useNewMessage = (chatID: string) => {
  const { socket } = useReactQuerySubscription();
  const [isSocketError, setIsSocketError] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<MessageForm>({
    resolver: zodResolver(NewMessageSchema),
  });

  const submitFn = handleSubmit(async ({ text }) => {
    setIsSocketError(false);
    const message = {
      text,
      toId: chatID,
    };

    if (!socket) {
      setIsSocketError(true);
      return;
    }

    socket.emit("send-message", message);
    reset();
  });

  return {
    register,
    submitFn,
    errors,
    isSubmitting,
    isValid,
    isDirty,
    isSocketError,
  };
};
