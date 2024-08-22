import { z } from "zod";

export const updateAvatarSchema = z.object({
  file: z.instanceof(File).optional(),
});

export type UpdateAvatarValues = z.infer<typeof updateAvatarSchema>;
