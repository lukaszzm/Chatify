import { Title } from "@chatify/ui";

import { AuthFooter } from "@/features/auth/components/auth-footer";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export const SignIn = () => {
  return (
    <>
      <Title className="text-center text-4xl font-semibold">Welcome back</Title>
      <SignInForm />
      <AuthFooter
        label="Don't have an account?"
        linkText="Create an account"
        to="/sign-up"
      />
    </>
  );
};
