import type { Participant } from "@/features/chat/types";
import { generateChatTitle } from "@/features/chat/utils";
import type { Nullable } from "@/types";

interface ChatHeaderProps {
  title: Nullable<string>;
  participants: Participant[];
}

export const ChatHeader = ({ title, participants }: ChatHeaderProps) => {
  const dynamicTitle = title ?? generateChatTitle(participants);

  return (
    <div className="border-b border-border p-2 pb-4">
      <h1 className="text-xl font-semibold">{dynamicTitle}</h1>
    </div>
  );
};
