import { z } from "zod";

export const signInCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignInCredentials = z.infer<typeof signInCredentialsSchema>;
