import { Avatar, AvatarFallback, AvatarImage } from "@chatify/ui";

interface UserAvatarProps {
  profilePicture?: string | null;
  firstName: string;
  lastName: string;
  className?: string;
}

export const UserAvatar = ({
  profilePicture,
  firstName,
  lastName,
  className,
}: UserAvatarProps) => {
  const fallback = `${firstName[0]}${lastName[0]}`;

  return (
    <Avatar className={className}>
      <AvatarImage
        src={profilePicture ?? undefined}
        alt={`Profile picture of ${firstName} ${lastName}`}
      />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
