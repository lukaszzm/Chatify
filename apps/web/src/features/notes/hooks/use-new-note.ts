import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { NewNoteValues } from "@/features/notes/schemas/new-note-schema";
import { newNoteSchema } from "@/features/notes/schemas/new-note-schema";

export const useNewNote = () => {
  const form = useForm<NewNoteValues>({
    resolver: zodResolver(newNoteSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = form.handleSubmit((_values) => {});

  return {
    form,
    onSubmit,
  };
};
