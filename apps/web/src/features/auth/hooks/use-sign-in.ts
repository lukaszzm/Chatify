import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { SignInCredentials } from "@/features/auth/schemas/credentials-schema";
import { signInCredentialsSchema } from "@/features/auth/schemas/credentials-schema";

export function useSignIn() {
  const form = useForm<SignInCredentials>({
    resolver: zodResolver(signInCredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(_data: SignInCredentials) {}

  return {
    form,
    onSubmit,
  };
}
