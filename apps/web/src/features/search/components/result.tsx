import { Avatar, AvatarFallback, Button } from "@chatify/ui";

import { useStartChat } from "@/features/search/hooks/use-start-chat";

interface ResultProps {
  id: string;
  firstName: string;
  lastName: string;
}

export const Result = ({ id, firstName, lastName }: ResultProps) => {
  const { startChat, fetching } = useStartChat();

  const fallback = `${firstName.at(0)}${lastName.at(0)}`;

  return (
    <div className="flex w-1/3 flex-col items-center gap-1 rounded-sm bg-background/80 p-2">
      <Avatar>
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <p className="text-center text-sm">
        {firstName} {lastName}
      </p>
      <Button
        size="xs"
        variant="muted"
        onClick={() => startChat(id)}
        isLoading={fetching}
        aria-label={`Start chat with ${firstName} ${lastName}`}
      >
        Chat
      </Button>
    </div>
  );
};
