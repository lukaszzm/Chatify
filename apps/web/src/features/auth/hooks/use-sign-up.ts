import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";

import { useAuth } from "@/features/auth/hooks/use-auth";
import type { SignUpCredentials } from "@/features/auth/schemas/sign-up-credentials-schema";
import { signUpCredentialsSchema } from "@/features/auth/schemas/sign-up-credentials-schema";
import { SIGN_UP_MUTATION } from "@/lib/gql/mutations";

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
  const [{ error }, signUpMutation] = useMutation(SIGN_UP_MUTATION);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpCredentials) => {
    const result = await signUpMutation({ data });

    if (result.data?.signUp) {
      await signIn(result.data.signUp);
      await navigate({
        to: "/chat",
      });
    }
  };

  return {
    form,
    onSubmit,
    error,
  };
};
