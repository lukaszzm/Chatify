import { Avatar, AvatarFallback, Button } from "@ui/index";

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
    <div className="flex flex-col gap-1 items-center bg-muted/80 rounded-sm p-2 w-1/3">
      <Avatar>
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <p className="text-sm">
        {firstName} {lastName}
      </p>
      <Button
        size="xs"
        onClick={() => startChat(id)}
        isLoading={fetching}
        aria-label={`Start chat with ${firstName} ${lastName}`}
      >
        Chat
      </Button>
    </div>
  );
};
