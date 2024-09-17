import { createFileRoute } from "@tanstack/react-router";

import { SignIn } from "@/features/auth/components/sign-in";

export const Route = createFileRoute("/_auth/sign-in")({
  component: SignIn,
});
