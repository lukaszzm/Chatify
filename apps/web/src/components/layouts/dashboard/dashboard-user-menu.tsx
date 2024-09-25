import { CurrentUserAvatar } from "@/features/auth/components/current-user-avatar";
import { SignOut } from "@/features/auth/components/sign-out";

export const DashboardUserMenu = () => {
  return (
    <nav
      aria-label="User menu"
      className="mt-auto flex w-1/4 items-center justify-around gap-4 md:w-auto md:flex-col"
    >
      <CurrentUserAvatar className="hidden md:block" />
      <SignOut />
    </nav>
  );
};
