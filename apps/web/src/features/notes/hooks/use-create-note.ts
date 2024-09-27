import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";

import type { CreateNoteValues } from "@/features/notes/schemas/create-note-schema";
import { createNoteSchema } from "@/features/notes/schemas/create-note-schema";
import { CREATE_NOTE_MUTATION } from "@/graphql/mutations/create-note";

interface UseCreateNoteOptions {
  onSuccess?: () => void;
}

export const useCreateNote = (options?: UseCreateNoteOptions) => {
  const { onSuccess } = options || {};

  const form = useForm<CreateNoteValues>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: "",
    },
  });

  const [{ error }, createNote] = useMutation(CREATE_NOTE_MUTATION);
  const navigate = useNavigate();

  const onSubmit = form.handleSubmit(async (values) => {
    const res = await createNote({ data: values });

    if (res.data?.createNote.id) {
      await navigate({
        to: "/notes/$noteId",
        params: { noteId: res.data.createNote.id },
      });
      onSuccess?.();
    }
  });

  return {
    form,
    onSubmit,
    error,
  };
};
