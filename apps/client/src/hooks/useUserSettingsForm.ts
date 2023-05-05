import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AxiosError } from "axios";

export const useUserSettingsForm = <T extends FieldValues>({
  defaultValues,
  schema,
  mutationFn,
}: {
  defaultValues: any;
  schema: z.ZodSchema;
  mutationFn: (value: T) => Promise<void>;
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: (values: T) => mutationFn(values),
    onMutate: () => {
      setErrorMessage(null);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["auth"]);
    },
    onError: async (error) => {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data || "Something went wrong");
      }
    },
  });

  const submitFn = handleSubmit((values) => mutate(values));

  return {
    mutate,
    register,
    submitFn,
    errors,
    isValid,
    isLoading,
    isDirty,
    isError,
    isSuccess,
    errorMessage,
  };
};
