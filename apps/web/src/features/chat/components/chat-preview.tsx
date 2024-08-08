import { Avatar, AvatarFallback, SidebarItem } from "@chatify/ui";
import { Link } from "@tanstack/react-router";

import { useAuth } from "@/features/auth";
import { generateChatTitle } from "@/features/chat/utils";
import type { ChatUpdatedSubscription } from "@/gql/graphql";
import { formatDate } from "@/utils/format-date";

export const ChatPreview = ({
  id,
  type,
  participants,
  latestMessage,
}: ChatUpdatedSubscription["chatUpdated"]) => {
  const { user } = useAuth();

  const title = generateChatTitle(type, participants, user?.id);
  const isMine = latestMessage.sender.id === user?.id;

  return (
    <SidebarItem asChild>
      <Link
        aria-label={`View chat: ${title}`}
        to="/chat/$chatId"
        params={{ chatId: id }}
        activeProps={{ className: "bg-muted/40" }}
        className="flex items-center gap-4 max-w-[22rem]"
      >
        <Avatar>
          <AvatarFallback>XX</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h3 className="font-semibold leading-none">{title}</h3>
            <span className="text-xs text-muted-foreground/80">
              {formatDate(latestMessage.createdAt)}
            </span>
          </div>

          <p className="text-muted-foreground text-xs truncate">
            <span className="font-semibold">
              {isMine ? "You" : latestMessage.sender.firstName}:
            </span>{" "}
            {latestMessage.content}
          </p>
        </div>
      </Link>
    </SidebarItem>
  );
};
