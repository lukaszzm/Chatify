import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  TooltipButton,
} from "@chatify/ui";
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
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <TooltipButton tooltipText="Sign Out" className={className}>
            <LogOut />
          </TooltipButton>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out from your Chatify account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={signOut}>Sign Out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
