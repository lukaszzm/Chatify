import { TooltipButton } from "@chatify/ui";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

import { clearAuthTokens } from "@/features/auth/utils";

interface SignOutProps {
  className?: string;
}

export const SignOut = ({ className }: SignOutProps) => {
  const navigate = useNavigate();

  const signOut = async () => {
    clearAuthTokens();
    await navigate({
      to: "/",
    });
  };

  return (
    <TooltipButton tooltipText="Sign Out" onClick={signOut} className={className}>
      <LogOut />
    </TooltipButton>
  );
};
