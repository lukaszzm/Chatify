import { toast } from "sonner";
import { useMutation } from "urql";

import { TOGGLE_LOCK_MUTATION } from "@/lib/gql/mutations";

export const useToggleLock = () => {
  const [, toggleLockMutation] = useMutation(TOGGLE_LOCK_MUTATION);

  const toggleLock = async (noteId: string) => {
    const result = await toggleLockMutation({ noteId });

    if (result.error) {
      toast.error("Failed to lock/unlock note, please try again.");
      return;
    }
  };

  return {
    toggleLock,
  };
};
