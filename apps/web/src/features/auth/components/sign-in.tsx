import { AuthFooter } from "@/features/auth/components/auth-footer";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export const SignIn = () => {
  return (
    <>
      <h1 className="text-4xl font-semibold text-center">Welcome back</h1>
      <SignInForm />
      <AuthFooter
        label="Don't have an account?"
        linkText="Create an account"
        to="/sign-up"
      />
    </>
  );
};
