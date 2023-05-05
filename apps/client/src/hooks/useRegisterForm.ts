import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "./useAuth";
import { useState } from "react";
import { AxiosError } from "axios";

type FormData = z.infer<typeof RegisterSchema>;

export const useRegisterForm = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(RegisterSchema),
  });
  const { registerMutation } = useAuth();
  const [axiosError, setAxiosError] = useState<string | null>(null);

  const onSubmit = async (values: FormData) => {
    setAxiosError(null);
    try {
      await registerMutation.mutateAsync(values);
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
