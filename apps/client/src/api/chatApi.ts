import { Message, MessageForm } from "../interfaces/Message";
import { axiosConfig } from "../service/axiosConfig";

export const getRecentMessages = async () => {
  const response = await axiosConfig.get("messages/recent");
  console.log("get-recent-message");
  console.log(response.data);
  console.log("-----------------------");
  return response.data;
};

export const newMessage = async (message: MessageForm) => {
  const response = await axiosConfig.post(`messages/`, message);
  console.log("post-new-message");
  console.log(response.data);
  console.log("-----------------------");
  return response.data;
};

export const getMessages = async (id: string) => {
  const response = await axiosConfig.get(`messages/${id}`);
  console.log("get-messages-with-id");
  console.log(response.data);
  console.log("-----------------------");
  return response.data;
};
