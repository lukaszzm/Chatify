import { useChat } from "@/features/chat/hooks/use-chat";
import { generateChatTitle } from "@/features/chat/utils";

export const ChatHeader = () => {
  const { title, participants } = useChat();

  const dynamicTitle = title ?? generateChatTitle(participants);

  return (
    <div className="border-b border-border p-2 pb-4">
      <h1 className="text-xl font-semibold">{dynamicTitle}</h1>
    </div>
  );
};
