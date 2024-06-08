import {
  Button,
  Hybrid,
  HybridBody,
  HybridContent,
  HybridHeader,
  HybridTitle,
  HybridTrigger,
} from "@chatify/ui";

import { SignInForm } from "@/features/auth/components/sign-in-form";

export const SignInDialog = () => {
  return (
    <Hybrid>
      <HybridTrigger asChild>
        <Button variant="outline" size="lg">
          Sign In
        </Button>
      </HybridTrigger>
      <HybridContent className="sm:max-w-md">
        <HybridHeader>
          <HybridTitle>Sign in to your account</HybridTitle>
        </HybridHeader>
        <HybridBody className="pb-8 sm:pb-auto">
          <SignInForm />
        </HybridBody>
      </HybridContent>
    </Hybrid>
  );
};
