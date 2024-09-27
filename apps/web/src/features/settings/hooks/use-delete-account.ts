import { toast } from "sonner";
import { useMutation } from "urql";

import { DELETE_ACCOUNT_MUTATION } from "@/graphql/mutations/delete-account";

interface UseDeleteAccountOptions {
  onDelete?: () => void;
}

export const useDeleteAccount = (options?: UseDeleteAccountOptions) => {
  const { onDelete } = options || {};

  const [, deleteAccountMutation] = useMutation(DELETE_ACCOUNT_MUTATION);

  const deleteAccount = async () => {
    const { error } = await deleteAccountMutation({});

    if (error) {
      toast.error("Failed to delete account. Please try again.");
      return;
    }

    onDelete?.();
  };

  return {
    deleteAccount,
  };
};
