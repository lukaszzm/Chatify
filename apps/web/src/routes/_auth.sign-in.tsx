import { createFileRoute } from "@tanstack/react-router";

import { SignIn } from "@/features/auth";

export const Route = createFileRoute("/_auth/sign-in")({
  component: SignIn,
});
