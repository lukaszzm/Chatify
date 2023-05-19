import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Note } from "../interfaces/Note";
import { newNote } from "../api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NoteSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export const useNewNote = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (note: Note) => newNote(note),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["notes"]);
      onSuccess();
    },
  });

  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof NoteSchema>
  >({
    resolver: zodResolver(NoteSchema),
  });

  const submitFn = handleSubmit(({ title, text }) =>
    mutate({ title, text, _id: "" })
  );

  return {
    submitFn,
    register,
    isLoading,
    isError,
    formState,
  };
};
