import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";

import { useAuth } from "@/features/auth/hooks/use-auth";
import type { SignInCredentials } from "@/features/auth/schemas/credentials-schema";
import { signInCredentialsSchema } from "@/features/auth/schemas/credentials-schema";
import { graphql } from "@/gql";

const SignInMutation = graphql(`
  mutation SignIn($data: SignInInput!) {
    signIn(data: $data) {
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

  const [{ error }, signInMutation] = useMutation(SignInMutation);

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ from: "/_auth" });

  const onSubmit = async (data: SignInCredentials) => {
    const result = await signInMutation({ data });
    if (result.data?.signIn) {
      await signIn(result.data.signIn);
      await navigate({
        to: search.redirect || "/chat",
      });
    }
  };

  return {
    form,
    onSubmit,
    error,
  };
}
