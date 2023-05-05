import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "../interfaces/Message";
import { useAuth } from "./useAuth";

const SOCKET_URL = import.meta.env.VITE_URL as string;

export const useReactQuerySubscription = () => {
  const [socket, setSocket] = useState<Socket>();
  const { authData } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io(SOCKET_URL, {});

    if (socket && authData) {
      socket.emit("add-user", authData._id);
      setSocket(socket);
    }

    socket.on("receive-message", async (message: Message) => {
      await queryClient.cancelQueries(["messages", "recent-messages"]);
      const prevMessages = queryClient.getQueryData<Message[]>(["messages"]);
      const prevRecentMessages = queryClient.getQueryData<Message[]>([
        "recent-messages",
      ]);
      if (prevMessages) {
        queryClient.setQueryData(["messages"], [...prevMessages, message]);
      }
      if (prevRecentMessages) {
        const newRecentMessages = prevRecentMessages.filter(
          (el: Message) => el.userInfo[0]._id !== message.userInfo[0]._id
        );
        newRecentMessages.unshift(message);
        queryClient.setQueryData(["recent-messages"], newRecentMessages);
      }

      await Promise.all([
        queryClient.invalidateQueries(["messages"]),
        queryClient.invalidateQueries(["recent-messages"]),
      ]);
    });

    return () => {
      socket.close();
    };
  }, [authData, queryClient, setSocket]);

  return { socket };
};
