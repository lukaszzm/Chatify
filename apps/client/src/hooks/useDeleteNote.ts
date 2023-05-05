import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../api";

export const useDeleteNote = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (noteID: string) => deleteNote(noteID),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["notes"]);
      navigate("/dashboard/notes/");
    },
  });

  return {
    mutate,
    isLoading,
    isError,
  };
};
