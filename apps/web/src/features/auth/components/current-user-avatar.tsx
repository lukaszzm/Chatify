import { UserAvatar } from "@/components/user-avatar";
import { useAuth } from "@/features/auth/hooks/use-auth";

export const CurrentUserAvatar = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return <UserAvatar className="hidden md:block" {...user} />;
};
