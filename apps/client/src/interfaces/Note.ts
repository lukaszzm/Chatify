import { NoteSchema } from "../schemas";
import { z } from "zod";

export type NoteForm = z.infer<typeof NoteSchema>;

export interface Note extends NoteForm {
  id: string;
  createdAt: Date;
}
