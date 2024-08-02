import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Button,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@chatify/ui";

import { useAuth } from "@/features/auth";
import { useDeleteAccount } from "@/features/settings/hooks/use-delete-account";

export const DeleteAccount = () => {
  const { signOut } = useAuth();
  const { deleteAccount } = useDeleteAccount({
    onDelete: signOut,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          Permanently delete your account, this action cannot be undone. Please be sure
          before proceeding.
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete your account? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteAccount}>
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
