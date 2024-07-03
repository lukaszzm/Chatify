import { toast } from "sonner";
import { useMutation } from "urql";

import { graphql } from "@/gql";

const UpdateNoteMutation = graphql(`
  mutation UpdateNote($noteId: String!, $content: String!) {
    updateNote(noteId: $noteId, content: $content) {
      id
    }
  }
`);

export const useUpdateNote = () => {
  const [, updateNoteMutation] = useMutation(UpdateNoteMutation);

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
