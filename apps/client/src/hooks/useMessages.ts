import { useQuery } from "@tanstack/react-query";
import { Message } from "../interfaces/Message";
import { getMessages } from "../api/messages";

export const useMessages = (id: string) => {
  return useQuery<Message[]>({
    queryKey: ["messages", id],
    queryFn: () => getMessages(id),
  });
};
