import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
});

export type CreateNoteValues = z.infer<typeof createNoteSchema>;
