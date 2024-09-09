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
import { LogOut } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/use-auth";

interface SignOutProps {
  className?: string;
}

export const SignOut = ({ className }: SignOutProps) => {
  const { signOut } = useAuth();

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <TooltipButton tooltipText="Sign Out" className={className}>
            <LogOut strokeWidth={2.35} />
            <span className="sr-only">Sign Out</span>
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
