import { MessageForm } from "../../interfaces/Message";
import { axiosConfig } from "../../service/axiosConfig";

export const getRecentMessages = async () => {
  const response = await axiosConfig.get("messages/recent");
  return response.data;
};

export const newMessage = async (message: MessageForm) => {
  const response = await axiosConfig.post(`messages/`, message);
  return response.data;
};

export const getMessages = async (id: string) => {
  const response = await axiosConfig.get(`messages/${id}`);
  return response.data;
};
