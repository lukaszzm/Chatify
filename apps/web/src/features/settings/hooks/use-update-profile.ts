import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "urql";

import type { AuthUser } from "@/features/auth/contexts/auth-context";
import type { UpdateProfileValues } from "@/features/settings/schemas/update-profile-schema";
import { updateProfileSchema } from "@/features/settings/schemas/update-profile-schema";
import { UPDATE_PROFILE_MUTATION } from "@/lib/gql/mutations";

export const useUpdateProfile = (defaultUser: AuthUser | null) => {
  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      email: defaultUser?.email ?? "",
      firstName: defaultUser?.firstName ?? "",
      lastName: defaultUser?.lastName ?? "",
    },
  });

  const [{ error }, updateProfileMutation] = useMutation(UPDATE_PROFILE_MUTATION);

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
