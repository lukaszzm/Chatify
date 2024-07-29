import { Avatar, AvatarFallback, SidebarItem } from "@chatify/ui";
import { Link } from "@tanstack/react-router";

import { useAuth } from "@/features/auth";
import { generateChatTitle } from "@/features/chat/utils";
import { formatDate } from "@/utils/format-date";

interface ChatPreviewProps {
  id: string;
  title?: string | null;
  participants: {
    id: string;
    firstName: string;
    lastName: string;
  }[];
  message: {
    id: string;
    sender: {
      id: string;
      firstName: string;
    };
    content: string;
    createdAt: string;
  };
}

export const ChatPreview = ({ id, title, participants, message }: ChatPreviewProps) => {
  const { user } = useAuth();

  const fixedTitle = title ?? generateChatTitle(participants);
  const isMine = message.sender.id === user?.id;

  return (
    <SidebarItem asChild>
      <Link
        aria-label={`View chat: ${fixedTitle}`}
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
            <h3 className="font-semibold leading-none">{fixedTitle}</h3>
            <span className="text-xs text-muted-foreground/80">
              {formatDate(message.createdAt)}
            </span>
          </div>

          <p className="text-muted-foreground text-xs truncate">
            <span className="font-semibold">
              {isMine ? "You" : message.sender.firstName}:
            </span>{" "}
            {message.content}
          </p>
        </div>
      </Link>
    </SidebarItem>
  );
};
