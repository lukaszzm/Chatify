import { z } from "zod";

export const newNoteSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
});

export type NewNoteValues = z.infer<typeof newNoteSchema>;
