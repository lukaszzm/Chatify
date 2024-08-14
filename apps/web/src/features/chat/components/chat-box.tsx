import { ChatMessages } from "@/features/chat/components/chat-messages";

export const ChatBox = () => {
  return (
    <div className="flex flex-1 flex-col-reverse gap-4 overflow-auto px-4">
      <ChatMessages />
    </div>
  );
};
