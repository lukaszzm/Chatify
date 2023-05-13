import styles from "./LoginForm.module.css";
import {
  Alert,
  Button,
  ImageInput,
  Input,
  Label,
} from "../../../components/UI";
import { useRegisterForm } from "../../../hooks/useRegisterForm";
import * as React from "react";

export const RegisterForm = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
    axiosError,
  } = useRegisterForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1>Register</h1>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        placeholder="example@example.com"
        error={errors.email}
        {...register("email")}
      />
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        placeholder="********"
        error={errors.password}
        {...register("password")}
      />
      <Label htmlFor="profileImage">Profile Image</Label>
      <ImageInput {...register("profileImage")} id={"profileImage"} />
      <Label htmlFor="firstName">First Name</Label>
      <Input
        id="firstName"
        type="text"
        placeholder="John"
        error={errors.firstName}
        {...register("firstName")}
      />
      <Label htmlFor="lastName">Last Name</Label>
      <Input
        id="lastName"
        type="text"
        placeholder="Smith"
        error={errors.lastName}
        {...register("lastName")}
      />
      {axiosError && <Alert error>{axiosError}</Alert>}
      <Button type="submit" disabled={isSubmitting || !isDirty || !isValid}>
        Register
      </Button>
    </form>
  );
};
