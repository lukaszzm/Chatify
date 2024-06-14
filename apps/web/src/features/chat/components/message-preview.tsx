import { Avatar, AvatarFallback, Button } from "@chatify/ui";

interface MessagePreviewProps {
  firstName: string;
  lastName: string;
  createdAt: string;
  message: string;
}

export const MessagePreview = ({
  firstName,
  lastName,
  createdAt,
  message,
}: MessagePreviewProps) => {
  const avatarFallback = `${firstName.at(0)}${lastName.at(0)}`;

  return (
    <Button
      variant="ghost"
      size="auto"
      className="p-2 rounded-sm justify-start items-start gap-2 w-full hover:bg-muted/40"
    >
      <Avatar>
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="flex-1 text-left min-w-0">
        <div className="flex justify-between w-full">
          <h3 className="font-semibold text-primary">
            {firstName} {lastName}
          </h3>
          <span className="text-xs text-muted-foreground/80">{createdAt}</span>
        </div>
        <p className="text-muted-foreground text-xs truncate">{message}</p>
      </div>
    </Button>
  );
};
