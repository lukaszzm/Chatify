import styles from "./ChangeLastName.module.css";
import { Input, Button, Label, Alert } from "../../../components/UI";
import { useUserSettingsForm } from "../../../hooks/useUserSettingsForm";
import { z } from "zod";
import { ChangeLastNameSchema } from "../../../schemas";

interface ChangeBoxProps {
  initialValue: string;
}

type FormData = z.infer<typeof ChangeLastNameSchema>;

export const ChangeLastName = ({ initialValue }: ChangeBoxProps) => {
  const { submitFn, register, errors, isSuccess, isError, isValid, isLoading, isDirty } = useUserSettingsForm<FormData>(
    {
      defaultValues: {
        lastName: initialValue,
      },
      schema: ChangeLastNameSchema,
    },
  );

  return (
    <form onSubmit={submitFn} className={styles.form}>
      <Label htmlFor="value">Last Name</Label>
      <Input id="value" placeholder="" {...register("lastName")} error={errors.lastName}></Input>
      {isSuccess && <Alert>Last name has been changed successfully</Alert>}
      {isError && <Alert error>Something went wrong</Alert>}
      <Button maxWidth="80px" disabled={!isValid || !isDirty || isLoading} type="submit">
        Save
      </Button>
    </form>
  );
};
