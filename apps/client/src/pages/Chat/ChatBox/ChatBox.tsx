import { useParams } from "react-router-dom";
import { NewMessage } from "./NewMessage";
import { Messages } from "./Messages";
import { ChatInfo } from "./ChatInfo";
import { Content, Notification } from "../../../components/UI";

export const ChatBox = () => {
  const { chatId } = useParams();

  return (
    <Content>
      {chatId ? (
        <>
          <ChatInfo chatId={chatId} />
          <Messages chatId={chatId} />
          <NewMessage chatId={chatId} />
        </>
      ) : (
        <Notification>Select user to start chatting.</Notification>
      )}
    </Content>
  );
};
