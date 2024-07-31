import { toast } from "sonner";
import { useMutation } from "urql";

import { UPDATE_NOTE_MUTATION } from "@/lib/gql/mutations";

export const useUpdateNote = () => {
  const [, updateNoteMutation] = useMutation(UPDATE_NOTE_MUTATION);

  const updateNote = async (noteId: string, content: string) => {
    const result = await updateNoteMutation({ noteId, content });

    if (result.error) {
      toast.error("Failed to update note, please try again.");
      return;
    }
  };

  return {
    updateNote,
  };
};
