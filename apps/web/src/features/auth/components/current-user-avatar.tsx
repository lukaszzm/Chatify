import { UserAvatar } from "@/components/user-avatar";
import { useAuth } from "@/features/auth/hooks/use-auth";

interface CurrentUserAvatarProps {
  className?: string;
}

export const CurrentUserAvatar = ({ className }: CurrentUserAvatarProps) => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return <UserAvatar className={className} {...user} />;
};
