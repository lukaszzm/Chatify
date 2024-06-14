import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUpCredentialsSchema } from "@/features/auth/schemas/credentials-schema";
import type { SignUpCredentials } from "@/features/auth/schemas/credentials-schema";

export const useSignUp = () => {
  const form = useForm<SignUpCredentials>({
    resolver: zodResolver(signUpCredentialsSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const onSubmit = (_data: SignUpCredentials) => {
    // Implement sign-up logic
  };

  return {
    form,
    onSubmit,
  };
};
