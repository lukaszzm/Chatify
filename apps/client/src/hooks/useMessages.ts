import { useQuery } from "@tanstack/react-query";
import { Message } from "../interfaces/Message";
import { getMessages } from "../api";

export const useMessages = (ID: string) => {
  return useQuery<Message[]>({
    queryKey: ["messages", ID],
    queryFn: () => getMessages(ID),
  });
};
