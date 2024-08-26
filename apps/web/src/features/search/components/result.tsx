import { Button } from "@chatify/ui";

import { UserAvatar } from "@/components/user-avatar";
import { useStartChat } from "@/features/search/hooks/use-start-chat";

interface ResultProps {
  id: string;
  profilePicture?: string | null;
  firstName: string;
  lastName: string;
}

export const Result = ({ id, profilePicture, firstName, lastName }: ResultProps) => {
  const { startChat, fetching } = useStartChat();

  return (
    <div className="flex w-1/3 flex-col items-center gap-1 rounded-sm bg-background/80 p-2">
      <UserAvatar
        profilePicture={profilePicture}
        firstName={firstName}
        lastName={lastName}
      />
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
