import { ScrollArea } from "@chatify/ui";

import { ChatMessages } from "@/features/chat/components/chat-messages";

export const ChatBox = () => {
  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col-reverse gap-4 px-4">
        <ChatMessages />
      </div>
    </ScrollArea>
  );
};
