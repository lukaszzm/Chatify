import { Avatar, AvatarFallback, SidebarItem } from "@chatify/ui";
import { Link } from "@tanstack/react-router";

interface ChatPreviewProps {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  message: string;
}

export const ChatPreview = ({
  id,
  firstName,
  lastName,
  createdAt,
  message,
}: ChatPreviewProps) => {
  const avatarFallback = `${firstName.at(0)}${lastName.at(0)}`;

  return (
    <SidebarItem asChild>
      <Link
        aria-label={`Chat with ${firstName} ${lastName}`}
        to="/chat/$chatId"
        params={{ chatId: id }}
        activeProps={{
          className: "bg-muted/40",
        }}
      >
        <Avatar>
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-left min-w-0">
          <div className="flex justify-between w-full">
            <h3 className="font-semibold text-primary text-base">
              {firstName} {lastName}
            </h3>
            <span className="text-xs text-muted-foreground/60">{createdAt}</span>
          </div>
          <p className="text-muted-foreground/80 text-xs truncate">{message}</p>
        </div>
      </Link>
    </SidebarItem>
  );
};
