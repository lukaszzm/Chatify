import { ChatHeader } from "@/features/chat/components/chat-header";

export const Chat = () => {
  return (
    <div className="bg-background rounded-md flex-1">
      <ChatHeader firstName="John" lastName="Smith" />
    </div>
  );
};
