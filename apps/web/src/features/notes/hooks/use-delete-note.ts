import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useMutation } from "urql";

import { DELETE_NOTE_MUTATION } from "@/lib/gql/mutations";

export const useDeleteNote = () => {
  const [, deleteNoteMutation] = useMutation(DELETE_NOTE_MUTATION);
  const navigate = useNavigate();

  const deleteNote = async (noteId: string) => {
    const result = await deleteNoteMutation({ noteId });

    if (result.error) {
      toast.error("Failed to delete note, please try again.");
      return;
    }

    toast.success("Note deleted successfully.");
    await navigate({
      to: "/notes",
    });
  };

  return {
    deleteNote,
  };
};
