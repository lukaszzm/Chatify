import { toast } from "sonner";
import { useMutation } from "urql";

import { DELETE_ACCOUNT_MUTATION } from "@/lib/gql/mutations";

interface UseDeleteAccountProps {
  onDelete?: () => void;
}

export const useDeleteAccount = ({ onDelete }: UseDeleteAccountProps) => {
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
