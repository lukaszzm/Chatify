import { Avatar, AvatarFallback } from "@chatify/ui";

import { MobileBackButton } from "@/components/mobile-back-button";
import { useAuth } from "@/features/auth";
import { useChat } from "@/features/chat/hooks/use-chat";
import { generateChatTitle } from "@/features/chat/utils";

export const ChatHeader = () => {
  const { user } = useAuth();
  const { type, participants } = useChat();

  const title = generateChatTitle(type, participants, user?.id);

  return (
    <div className="flex items-center gap-4 border-b border-border p-2 pb-4">
      <MobileBackButton to="/chat" variant="ghost" />
      <Avatar>
        <AvatarFallback>XX</AvatarFallback>
      </Avatar>
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
};
