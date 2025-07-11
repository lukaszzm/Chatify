import { Button } from "@chatify/ui";

import { UserAvatar } from "@/components/user-avatar";
import { useStartChat } from "@/features/search/hooks/use-start-chat";
import type { UserInfoFragment } from "@/generated/graphql";

type SearchResultProps = UserInfoFragment;

export const SearchResult = ({
  id,
  profilePicture,
  firstName,
  lastName,
}: SearchResultProps) => {
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
