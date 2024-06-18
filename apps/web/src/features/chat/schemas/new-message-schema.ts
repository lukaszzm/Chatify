import { z } from "zod";

export const newMessageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

export type NewMessageValues = z.infer<typeof newMessageSchema>;
