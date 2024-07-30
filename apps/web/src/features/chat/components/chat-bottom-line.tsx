import { useChat } from "@/features/chat/hooks/use-chat";

export const ChatBottomLine = () => {
  const { bottomRef } = useChat();

  return <div className="w-full h-0" ref={bottomRef} />;
};
