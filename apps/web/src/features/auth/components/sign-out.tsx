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
import { useLocation, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/use-auth";

interface SignOutProps {
  className?: string;
}

export const SignOut = ({ className }: SignOutProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    await navigate({ to: "/sign-in", search: { redirect: location.pathname } });
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
            <AlertDialogAction onClick={handleSignOut}>Sign Out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
