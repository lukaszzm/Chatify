import { SidebarItem } from "@chatify/ui";
import { Link } from "@tanstack/react-router";

import { UserAvatar } from "@/components/user-avatar";
import { useAuth } from "@/features/auth";
import { getSecondParticipant } from "@/features/chat/utils";
import type { ChatUpdatedSubscription } from "@/gql/graphql";
import { formatDate } from "@/utils/format-date";

export const ChatPreview = ({
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
            <h3 className="font-semibold">{`${secondParticipant.firstName} ${secondParticipant.lastName}`}</h3>
            <span className="text-xs text-muted-foreground/80">
              {formatDate(latestMessage.createdAt)}
            </span>
          </div>

          <p className="truncate text-xs text-muted-foreground">
            <span className="font-bold">
              {isMineMessage ? "You" : latestMessage.sender.firstName}:
            </span>{" "}
            {latestMessage.content}
          </p>
        </div>
      </Link>
    </SidebarItem>
  );
};
