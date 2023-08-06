import { useForm } from "react-hook-form";
import { SignInSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "./useAuth";
import { useState } from "react";
import { AxiosError } from "axios";
import type { SignInCredentials } from "../interfaces/Credentials";

export const useLoginForm = () => {
  const { register, handleSubmit, formState } = useForm<SignInCredentials>({
    resolver: zodResolver(SignInSchema),
  });
  const { signInMutation } = useAuth();
  const [axiosError, setAxiosError] = useState<string | null>(null);

  const onSubmit = async (credentials: SignInCredentials) => {
    setAxiosError(null);
    try {
      await signInMutation.mutateAsync(credentials);
    } catch (err) {
      if (err instanceof AxiosError) {
        setAxiosError(err.response?.data.message || "Something went wrong");
      }
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    formState,
    axiosError,
  };
};
