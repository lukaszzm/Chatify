import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { ChatList } from "./ChatList";
import { ChatBox } from "./ChatBox";
import { useReactQuerySubscription } from "../../hooks/useReactQuerySubscription";

export const Chat = () => {
  useReactQuerySubscription();
  const { chatId } = useParams();
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  if (isMobile && chatId) return <ChatBox />;

  if (isMobile && !chatId) return <ChatList />;

  return (
    <>
      <ChatList /> <ChatBox />
    </>
  );
};
