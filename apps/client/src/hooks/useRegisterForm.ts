import { useForm } from "react-hook-form";
import { SignUpSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "./useAuth";
import { useState } from "react";
import { AxiosError } from "axios";
import type { SignUpCredentials } from "../interfaces/Credentials";

export const useRegisterForm = () => {
  const { register, handleSubmit, formState } = useForm<SignUpCredentials>({
    resolver: zodResolver(SignUpSchema),
  });
  const { signUpMutation } = useAuth();
  const [axiosError, setAxiosError] = useState<string | null>(null);

  const onSubmit = async (credentials: SignUpCredentials) => {
    setAxiosError(null);
    try {
      await signUpMutation.mutateAsync(credentials);
    } catch (err) {
      if (err instanceof AxiosError) {
        setAxiosError(err.response?.data.message || "Something went wrong.");
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
