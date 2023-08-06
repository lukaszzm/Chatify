import { useReactQuerySubscription } from "./useReactQuerySubscription";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewMessageSchema } from "../schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Message } from "../interfaces/Message";
import { newMessage } from "../api";
import { useAuthenticatedUser } from "./useAuthenticatedUser";
import type { MessageForm } from "../interfaces/Message";
import { useState } from "react";

export const useNewMessage = (chatID: string) => {
  const { id, firstName, lastName, profileImage } = useAuthenticatedUser();
  const { socket } = useReactQuerySubscription();
  const [isSocketError, setIsSocketError] = useState(false);
  const queryClient = useQueryClient();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<MessageForm>({
    resolver: zodResolver(NewMessageSchema),
  });
  // const { mutate, isLoading, isError } = useMutation({
  //   mutationFn: (message: MessageForm) => newMessage(message),
  //   onSuccess: async (message: Message) => {
  //     socket?.emit("send-message", message);
  //     await Promise.all([
  //       queryClient.invalidateQueries(["recent-messages"]),
  //       queryClient.invalidateQueries(["messages"]),
  //     ]);
  //     reset();
  //   },
  // });

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
