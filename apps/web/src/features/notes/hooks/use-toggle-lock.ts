import { toast } from "sonner";
import { useMutation } from "urql";

import { graphql } from "@/gql";

const ToggleLockMutation = graphql(`
  mutation ToggleLock($noteId: String!) {
    toggleLock(noteId: $noteId) {
      id
    }
  }
`);

export const useToggleLock = () => {
  const [, toggleLockMutation] = useMutation(ToggleLockMutation);

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
