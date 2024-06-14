import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";

import type { SignInCredentials } from "@/features/auth/schemas/credentials-schema";
import { signInCredentialsSchema } from "@/features/auth/schemas/credentials-schema";
import { saveAuthTokens } from "@/features/auth/utils";
import { graphql } from "@/gql";

const LoginMutation = graphql(`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      accessToken
      refreshToken
    }
  }
`);

export function useSignIn() {
  const form = useForm<SignInCredentials>({
    resolver: zodResolver(signInCredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [{ error }, signIn] = useMutation(LoginMutation);

  const navigate = useNavigate();

  const onSubmit = async (data: SignInCredentials) => {
    const result = await signIn({ data });
    if (result.data?.login) {
      saveAuthTokens(result.data.login);
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
}
