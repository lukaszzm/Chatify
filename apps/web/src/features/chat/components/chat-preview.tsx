import { Avatar, AvatarFallback, Button } from "@chatify/ui";
import { Link } from "@tanstack/react-router";

interface ChatPreviewProps {
  firstName: string;
  lastName: string;
  createdAt: string;
  message: string;
}

export const ChatPreview = ({
  firstName,
  lastName,
  createdAt,
  message,
}: ChatPreviewProps) => {
  const avatarFallback = `${firstName.at(0)}${lastName.at(0)}`;

  return (
    <Button
      variant="ghost"
      size="auto"
      className="p-3 rounded-sm justify-start items-center gap-2 w-full hover:bg-muted/40"
      asChild
    >
      <Link aria-label={`Chat with ${firstName} ${lastName}`} to="/chat">
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
    </Button>
  );
};
