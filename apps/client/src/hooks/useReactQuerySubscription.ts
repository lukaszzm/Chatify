import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import type { Message, NewMessage, RecentMessage } from "../interfaces/Message";
import { useAuthenticatedUser } from "./useAuthenticatedUser";

const SOCKET_URL = import.meta.env.VITE_URL as string;

export const useReactQuerySubscription = () => {
  const [socket, setSocket] = useState<Socket>();
  const { id } = useAuthenticatedUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = io(SOCKET_URL, {
      auth: {
        token: `Bearer ${token}`,
      },
    });

    if (socket) {
      setSocket(socket);
    }

    socket.on("receive-message", async (message: NewMessage) => {
      await queryClient.cancelQueries(["messages", "recent-messages"]);
      const prevMessages = queryClient.getQueryData<Message[]>(["messages"]);
      const prevRecentMessages = queryClient.getQueryData<RecentMessage[]>(["recent-messages"]);
      console.log("---------------------------");
      console.log("------MESSAGE------");

      console.log(message);
      console.log("---------------------------");

      if (prevMessages) {
        queryClient.setQueryData(["messages"], [...prevMessages, message]);
      }
      if (prevRecentMessages) {
        const user = message.fromId === id ? message.to : message.from;
        const newRecentMessage = {
          ...message,
          userId: user.id,
          fullName: user.fullName,
          profileImage: user.profileImage,
        };
        const filteredRecentMessages = prevRecentMessages.filter((el) => el.userId !== user.id);
        queryClient.setQueryData(["recent-messages"], [newRecentMessage, ...filteredRecentMessages]);
      }

      await Promise.all([
        queryClient.invalidateQueries(["messages"]),
        queryClient.invalidateQueries(["recent-messages"]),
      ]);
    });

    return () => {
      socket.close();
    };
  }, [queryClient, setSocket]);

  return { socket };
};
