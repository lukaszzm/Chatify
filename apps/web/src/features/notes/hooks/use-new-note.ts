import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";

import type { NewNoteValues } from "@/features/notes/schemas/new-note-schema";
import { newNoteSchema } from "@/features/notes/schemas/new-note-schema";
import { graphql } from "@/gql";

const CreateNoteMutation = graphql(`
  mutation CreateNote($data: CreateNoteInput!) {
    createNote(data: $data) {
      id
    }
  }
`);

interface UseNewNoteProps {
  onSuccess?: () => void;
}

export const useNewNote = ({ onSuccess }: UseNewNoteProps) => {
  const form = useForm<NewNoteValues>({
    resolver: zodResolver(newNoteSchema),
    defaultValues: {
      title: "",
    },
  });

  const [{ error }, createNote] = useMutation(CreateNoteMutation);
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
