import { ChatBox } from "@/features/chat/components/chat-box";
import { ChatHeader } from "@/features/chat/components/chat-header";
import { ChatNewMessage } from "@/features/chat/components/chat-new-message";

export const Chat = () => {
  return (
    <div className="bg-background rounded-md flex-1 flex flex-col">
      <ChatHeader firstName="John" lastName="Smith" />
      <ChatBox />
      <ChatNewMessage />
    </div>
  );
};
