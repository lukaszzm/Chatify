import { Title } from "@chatify/ui";

import { AuthFooter } from "@/features/auth/components/auth-footer";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export const SignUp = () => {
  return (
    <>
      <Title className="text-center text-4xl font-semibold">Create an account</Title>
      <SignUpForm />
      <AuthFooter
        label="Already have an account?"
        linkText="Sign in here"
        to="/sign-in"
      />
    </>
  );
};
