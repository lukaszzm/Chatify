import styles from "./LoginForm.module.css";
import { Alert, Button, Input, Label } from "../../../components/UI";
import { useLoginForm } from "../../../hooks/useLoginForm";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    axiosError,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1>Login</h1>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        placeholder="Type your email here"
        error={errors.email}
        {...register("email")}
      />
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        placeholder="*******"
        error={errors.password}
        {...register("password")}
      />
      {axiosError && <Alert error>{axiosError}</Alert>}
      <Button type="submit" disabled={isSubmitting || !isDirty || !isValid}>
        Login
      </Button>
    </form>
  );
};
