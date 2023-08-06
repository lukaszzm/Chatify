import styles from "./ChangeImage.module.css";
import { Button, Alert, ImageInput } from "../../../components/UI";
import { useUserSettingsForm } from "../../../hooks/useUserSettingsForm";
import { z } from "zod";
import { ChangeProfileImageSchema } from "../../../schemas";

interface ChangeImageProps {
  defaultImage: string;
}

type FormData = z.infer<typeof ChangeProfileImageSchema>;

export const ChangeImage = ({ defaultImage }: ChangeImageProps) => {
  const { register, submitFn, isError, isValid, isDirty, isLoading, isSuccess } = useUserSettingsForm<FormData>({
    defaultValues: {},
    schema: ChangeProfileImageSchema,
  });

  return (
    <form onSubmit={submitFn} className={styles.form}>
      <ImageInput defaultImage={defaultImage} id="image" {...register("profileImage")} />
      {isError && <Alert error>Something went wrong</Alert>}
      {isSuccess && <Alert>Your profile image has been changed successfully</Alert>}
      <Button maxWidth="160px" type="submit" disabled={isLoading || !isDirty || !isValid}>
        Save new image
      </Button>
    </form>
  );
};
