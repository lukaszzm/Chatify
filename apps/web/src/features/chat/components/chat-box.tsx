import { ScrollArea } from "@chatify/ui";

import { ChatMessages } from "@/features/chat/components/chat-messages";

export const ChatBox = () => {
  return (
    <ScrollArea className="flex-1">
      <div className="p-2 space-y-2">
        <ChatMessages />
      </div>
    </ScrollArea>
  );
};
