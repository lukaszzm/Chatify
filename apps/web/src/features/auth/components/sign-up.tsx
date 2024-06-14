import { AuthFooter } from "@/features/auth/components/auth-footer";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export const SignUp = () => {
  return (
    <>
      <h1 className="text-4xl font-semibold text-center">Create an account</h1>
      <SignUpForm />
      <AuthFooter
        label="Already have an account?"
        linkText="Sign in here"
        to="/sign-in"
      />
    </>
  );
};
