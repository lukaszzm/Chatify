import { z } from "zod";
import { SignInSchema, SignUpSchema } from "../schemas";

export type SignInCredentials = z.infer<typeof SignInSchema>;

export type SignUpCredentials = z.infer<typeof SignUpSchema>;
