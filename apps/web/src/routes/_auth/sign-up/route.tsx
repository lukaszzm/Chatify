import { createFileRoute } from "@tanstack/react-router";

import { SignUp } from "@/features/auth/components/sign-up";

export const Route = createFileRoute("/_auth/sign-up")({
  component: SignUp,
});
