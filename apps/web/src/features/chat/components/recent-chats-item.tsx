import { SidebarItem } from "@chatify/ui";
import { Link } from "@tanstack/react-router";

import { UserAvatar } from "@/components/user-avatar";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { getSecondParticipant } from "@/features/chat/utils/get-second-participant";
import type { ChatUpdatedSubscription } from "@/gql/graphql";
import { formatDate } from "@/utils/format-date";

export const RecentChatsItem = ({
  id,
  participants,
  latestMessage,
}: ChatUpdatedSubscription["chatUpdated"]) => {
  const { user } = useAuth();

  const secondParticipant = getSecondParticipant(participants, user?.id);
  const isMineMessage = latestMessage.sender.id === user?.id;

  return (
    <SidebarItem asChild>
      <Link
        aria-label={`View chat with ${secondParticipant.firstName} ${secondParticipant.lastName}`}
        to="/chat/$chatId"
        params={{ chatId: id }}
        activeProps={{ className: "bg-muted/40" }}
      >
        <UserAvatar {...secondParticipant} />
        <div className="flex w-full min-w-0 flex-col">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold">{`${secondParticipant.firstName} ${secondParticipant.lastName}`}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {formatDate(latestMessage.createdAt)}
            </span>
          </div>

          <p className="truncate text-xs font-normal text-muted-foreground">
            <span className="mr-1 font-semibold">
              {isMineMessage ? "You" : latestMessage.sender.firstName}:
            </span>
            {latestMessage.content}
          </p>
        </div>
      </Link>
    </SidebarItem>
  );
};
