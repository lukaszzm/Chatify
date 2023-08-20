import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newNote } from "../api/notes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NoteSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NoteForm } from "../interfaces/Note";

export const useNewNote = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (note: NoteForm) => newNote(note),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["notes"]);
      onSuccess();
    },
  });

  const { register, handleSubmit, formState } = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
  });

  const submitFn = handleSubmit((values) => mutate(values));

  return {
    submitFn,
    register,
    isLoading,
    isError,
    formState,
  };
};
