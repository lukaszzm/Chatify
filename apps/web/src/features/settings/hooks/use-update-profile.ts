import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "urql";

import {
  updateProfileSchema,
  type UpdateProfileValues,
} from "@/features/settings/schemas/update-profile-schema";
import type { User } from "@/generated/graphql";
import { UPDATE_PROFILE_INFO_MUTATION } from "@/graphql/mutations/update-profile-info";

interface UseUpdateProfileOptions {
  defaultValues?: User | null;
}

export const useUpdateProfile = (options?: UseUpdateProfileOptions) => {
  const { defaultValues } = options || {};

  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      ...defaultValues,
    },
  });

  const [{ error }, updateProfileMutation] = useMutation(UPDATE_PROFILE_INFO_MUTATION);

  const updateProfile = async (values: UpdateProfileValues) => {
    const { data } = await updateProfileMutation({ data: values });

    if (data?.updateProfile) {
      toast.success("Profile updated successfully");
    }
  };

  return {
    form,
    updateProfile,
    error,
  };
};
