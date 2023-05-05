import styles from "./ChangeFirstName.module.css";
import { Input, Button, Label, Alert } from "../../../components/UI";
import { z } from "zod";
import { updateFirstName } from "../../../api/usersApi";
import { InputSchema } from "../../../schemas";
import { useUserSettingsForm } from "../../../hooks/useUserSettingsForm";

interface ChangeBoxProps {
  initialValue: string;
}

type FormData = z.infer<typeof InputSchema>;

export const ChangeFirstName = ({ initialValue }: ChangeBoxProps) => {
  const {
    submitFn,
    register,
    errors,
    isSuccess,
    isError,
    isValid,
    isLoading,
    isDirty,
  } = useUserSettingsForm<FormData>({
    defaultValues: {
      value: initialValue,
    },
    schema: InputSchema,
    mutationFn: updateFirstName,
  });

  return (
    <form onSubmit={submitFn} className={styles.form}>
      <Label htmlFor="value">First Name</Label>
      <Input
        id="value"
        placeholder=""
        error={errors.value}
        {...register("value")}
      ></Input>
      {isSuccess && <Alert>First name has been changed successfully</Alert>}
      {isError && <Alert error>Something went wrong</Alert>}
      <Button
        maxWidth="80px"
        disabled={!isValid || !isDirty || isLoading}
        type="submit"
      >
        Save
      </Button>
    </form>
  );
};
