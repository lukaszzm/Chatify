import { z } from "zod";

export const newMessageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
});

export type NewMessageValues = z.infer<typeof newMessageSchema>;
