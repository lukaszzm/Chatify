import { z } from "zod";

export const updateProfilePictureSchema = z.object({
  file: z.instanceof(File).optional(),
});

export type UpdateProfilePictureValues = z.infer<typeof updateProfilePictureSchema>;
