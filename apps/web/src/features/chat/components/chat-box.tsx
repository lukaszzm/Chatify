import { ScrollArea } from "@chatify/ui";

import { ChatMessages } from "@/features/chat/components/chat-messages";

export const ChatBox = () => {
  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-4">
        <ChatMessages />
      </div>
    </ScrollArea>
  );
};
