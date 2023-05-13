import styles from "./Password.module.css";
import {
  Topbar,
  Input,
  Button,
  Alert,
  Label,
  SettingsContainer,
} from "../../../components/UI";
import { updatePassword } from "../../../api/usersApi";
import { useUserSettingsForm } from "../../../hooks/useUserSettingsForm";
import { z } from "zod";
import { ChangePasswordSchema } from "../../../schemas";

type FormData = z.infer<typeof ChangePasswordSchema>;

export const Password = () => {
  const {
    register,
    submitFn,
    errors,
    isValid,
    isError,
    isDirty,
    isLoading,
    isSuccess,
    errorMessage,
  } = useUserSettingsForm<FormData>({
    defaultValues: {},
    schema: ChangePasswordSchema,
    mutationFn: updatePassword,
  });

  return (
    <>
      <Topbar backTo="/dashboard/settings">
        <h2>Password Settings</h2>
      </Topbar>
      <SettingsContainer>
        <form onSubmit={submitFn} className={styles.form}>
          <Label htmlFor="currentPassword">Current password</Label>
          <Input
            id="currentPassword"
            placeholder="********"
            type="password"
            {...register("currentPassword")}
            error={errors.currentPassword}
          ></Input>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            placeholder="********"
            type="password"
            {...register("newPassword")}
            error={errors.newPassword}
          ></Input>
          {isError && <Alert error>{errorMessage}</Alert>}
          {isSuccess && (
            <Alert>Your password has been changed successfully</Alert>
          )}
          <Button
            maxWidth="80px"
            disabled={isLoading || !isDirty || !isValid}
            type="submit"
          >
            Save
          </Button>
        </form>
      </SettingsContainer>
    </>
  );
};
