import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { UpdateAvatarValues } from "@/features/settings/schemas/update-avatar-schema";
import { updateAvatarSchema } from "@/features/settings/schemas/update-avatar-schema";

export const useUpdateAvatar = () => {
  const form = useForm({
    resolver: zodResolver(updateAvatarSchema),
  });

  const updateAvatar = (_values: UpdateAvatarValues) => {};

  return {
    form,
    updateAvatar,
  };
};
