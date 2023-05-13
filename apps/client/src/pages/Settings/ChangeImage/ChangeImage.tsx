import styles from "./ChangeImage.module.css";
import { Button, Alert, ImageInput } from "../../../components/UI";
import { updateProfileImage } from "../../../api/usersApi";
import { useUserSettingsForm } from "../../../hooks/useUserSettingsForm";
import { z } from "zod";
import { ChangeImageSchema } from "../../../schemas";

interface ChangeImageProps {
  defaultImage: string;
  userId: string;
}

type FormData = z.infer<typeof ChangeImageSchema>;

export const ChangeImage = ({ defaultImage, userId }: ChangeImageProps) => {
  const {
    register,
    submitFn,
    isError,
    isValid,
    isDirty,
    isLoading,
    isSuccess,
  } = useUserSettingsForm<FormData>({
    defaultValues: {
      _id: userId,
    },
    schema: ChangeImageSchema,
    mutationFn: updateProfileImage,
  });

  return (
    <form onSubmit={submitFn} className={styles.form}>
      <ImageInput
        defaultImage={defaultImage}
        id="image"
        {...register("image")}
      />
      {isError && <Alert error>Something went wrong</Alert>}
      {isSuccess && (
        <Alert>Your profile image has been changed successfully</Alert>
      )}
      <Button
        maxWidth="160px"
        type="submit"
        disabled={isLoading || !isDirty || !isValid}
      >
        Save new image
      </Button>
    </form>
  );
};
