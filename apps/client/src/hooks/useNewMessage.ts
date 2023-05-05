import { useAuth } from "./useAuth";
import { useReactQuerySubscription } from "./useReactQuerySubscription";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewMessageSchema } from "../schemas";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Message } from "../interfaces/Message";
import { newMessage } from "../api";

type FormData = z.infer<typeof NewMessageSchema>;

export const useNewMessage = (chatID: string) => {
  const { authData } = useAuth();
  const { socket } = useReactQuerySubscription();
  const queryClient = useQueryClient();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(NewMessageSchema),
  });
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (message: Message) => newMessage(message),
    onSuccess: async (message: Message) => {
      socket?.emit("send-message", message);
      await Promise.all([
        queryClient.invalidateQueries(["recent-messages"]),
        queryClient.invalidateQueries(["messages"]),
      ]);
      reset();
    },
  });

  const submitFn = handleSubmit(async ({ text }) => {
    if (!authData) return;

    const message = {
      _id: `${authData._id}${chatID}`,
      text: text,
      fromId: authData._id,
      toId: chatID,
      createdAt: Date.now().toString(),
      userInfo: [
        {
          _id: authData._id,
          firstName: authData.firstName,
          lastName: authData.lastName,
          profileImage: authData.profileImage,
        },
      ],
    };

    mutate(message);
  });

  return {
    register,
    submitFn,
    errors,
    isLoading,
    isValid,
    isDirty,
    isError,
  };
};
