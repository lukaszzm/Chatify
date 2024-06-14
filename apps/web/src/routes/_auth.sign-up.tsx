import { createFileRoute } from "@tanstack/react-router";

import { SignUp } from "@/features/auth";

export const Route = createFileRoute("/_auth/sign-up")({
  component: SignUp,
});
