import styles from "./ChangeLastName.module.css";
import { Input, Button, Label, Alert } from "../../../components/UI";
import { useUserSettingsForm } from "../../../hooks/useUserSettingsForm";
import { z } from "zod";
import { InputSchema } from "../../../schemas";
import { updateLastName } from "../../../api/usersApi";

interface ChangeBoxProps {
  initialValue: string;
}

type FormData = z.infer<typeof InputSchema>;

export const ChangeLastName = ({ initialValue }: ChangeBoxProps) => {
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
    mutationFn: updateLastName,
  });

  return (
    <form onSubmit={submitFn} className={styles.form}>
      <Label htmlFor="value">Last Name</Label>
      <Input
        id="value"
        placeholder=""
        {...register("value")}
        error={errors.value}
      ></Input>
      {isSuccess && <Alert>Last name has been changed successfully</Alert>}
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
