import { z } from "zod";

import { signInCredentialsSchema } from "@/features/auth/schemas/sign-in-credentials-schema";

export const signUpCredentialsSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
  })
  .merge(signInCredentialsSchema);

export type SignUpCredentials = z.infer<typeof signUpCredentialsSchema>;
