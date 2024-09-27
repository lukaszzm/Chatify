import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "urql";

import type { UpdatePasswordValues } from "@/features/settings/schemas/update-password-schema";
import { updatePasswordSchema } from "@/features/settings/schemas/update-password-schema";
import { UPDATE_PASSWORD_MUTATION } from "@/graphql/mutations/update-password";

export const useUpdatePassword = () => {
  const form = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [{ error }, updatePasswordMutation] = useMutation(UPDATE_PASSWORD_MUTATION);

  const updatePassword = async (values: UpdatePasswordValues) => {
    const { data } = await updatePasswordMutation({ data: values });

    if (data) {
      toast.success("Password updated successfully");
    }
  };

  return {
    form,
    updatePassword,
    error,
  };
};
