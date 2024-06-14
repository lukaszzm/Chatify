import { z } from "zod";

export const signInCredentialsSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpCredentialsSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
  })
  .merge(signInCredentialsSchema);

export type SignInCredentials = z.infer<typeof signInCredentialsSchema>;

export type SignUpCredentials = z.infer<typeof signUpCredentialsSchema>;
