import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";

import type { NewNoteValues } from "@/features/notes/schemas/new-note-schema";
import { newNoteSchema } from "@/features/notes/schemas/new-note-schema";
import { CREATE_NOTE_MUTATION } from "@/lib/gql/mutations";

interface UseCreateNoteProps {
  onSuccess?: () => void;
}

export const useCreateNote = ({ onSuccess }: UseCreateNoteProps) => {
  const form = useForm<NewNoteValues>({
    resolver: zodResolver(newNoteSchema),
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
