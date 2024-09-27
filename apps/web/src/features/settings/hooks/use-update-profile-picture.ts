import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "urql";

import { updateProfilePictureSchema } from "@/features/settings/schemas/update-profile-picture-schema";
import type { UpdateProfilePictureValues } from "@/features/settings/schemas/update-profile-picture-schema";
import { UPDATE_PROFILE_PICTURE_MUTATION } from "@/graphql/mutations/update-profile-picture";

export const useUpdateProfilePicture = () => {
  const form = useForm({
    resolver: zodResolver(updateProfilePictureSchema),
  });

  const [{ error }, updateProfilePictureMutation] = useMutation(
    UPDATE_PROFILE_PICTURE_MUTATION
  );

  const updateProfilePicture = async (values: UpdateProfilePictureValues) => {
    const { data } = await updateProfilePictureMutation({ data: values });

    if (data) {
      toast.success("Profile picture updated successfully");
    }
  };

  return {
    form,
    updateProfilePicture,
    error,
  };
};
