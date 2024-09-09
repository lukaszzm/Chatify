import { Subtitle } from "@chatify/ui";

import { MobileBackButton } from "@/components/mobile-back-button";
import { UserAvatar } from "@/components/user-avatar";
import { useAuth } from "@/features/auth";
import { useChat } from "@/features/chat/hooks/use-chat";
import { getSecondParticipant } from "@/features/chat/utils";

export const ChatHeader = () => {
  const { user } = useAuth();
  const { participants } = useChat();

  const secondParticipant = getSecondParticipant(participants, user?.id);

  return (
    <div className="flex items-center gap-4 border-b border-border p-2 pb-4">
      <MobileBackButton to="/chat" variant="ghost" />
      <UserAvatar className="size-14" {...secondParticipant} />
      <Subtitle>{`${secondParticipant.firstName} ${secondParticipant.lastName}`}</Subtitle>
    </div>
  );
};
