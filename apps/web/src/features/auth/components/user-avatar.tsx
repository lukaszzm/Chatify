import { Avatar, AvatarFallback } from "@chatify/ui";

import { useAuth } from "@/features/auth/hooks/use-auth";

export const UserAvatar = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const fallback = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <Avatar className="hidden md:block">
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
