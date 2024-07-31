import { Avatar, AvatarFallback } from "@chatify/ui";

import { useAuth } from "@/features/auth";
import { useChat } from "@/features/chat/hooks/use-chat";
import { generateChatTitle } from "@/features/chat/utils";

export const ChatHeader = () => {
  const { user } = useAuth();
  const { type, participants } = useChat();

  const title = generateChatTitle(type, participants, user?.id);

  return (
    <div className="border-b border-border p-2 pb-4 flex items-center gap-4">
      <Avatar>
        <AvatarFallback>XX</AvatarFallback>
      </Avatar>
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
};
