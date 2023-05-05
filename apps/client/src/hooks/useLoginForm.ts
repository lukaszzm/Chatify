import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "./useAuth";
import { useState } from "react";
import { AxiosError } from "axios";

type FormData = z.infer<typeof LoginSchema>;

export const useLoginForm = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  });
  const { loginMutation } = useAuth();
  const [axiosError, setAxiosError] = useState<string | null>(null);

  const onSubmit = async (values: FormData) => {
    setAxiosError(null);
    try {
      await loginMutation.mutateAsync(values);
    } catch (err) {
      const error = err as AxiosError;
      setAxiosError(error.response?.data as string);
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
