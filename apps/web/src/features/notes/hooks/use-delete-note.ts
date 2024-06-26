import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useMutation } from "urql";

import { graphql } from "@/gql";

const DeleteNoteMutation = graphql(`
  mutation DeleteNote($noteId: String!) {
    deleteNote(noteId: $noteId) {
      id
    }
  }
`);

export const useDeleteNote = () => {
  const [, deleteNoteMutation] = useMutation(DeleteNoteMutation);
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
