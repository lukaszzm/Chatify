import { createFileRoute } from "@tanstack/react-router";

import { SignUp } from "@/features/auth/components/sign-up";
import { matchPageTitle } from "@/utils/match-page-title";

export const Route = createFileRoute("/_auth/sign-up")({
  head: () => ({
    meta: [{ title: matchPageTitle("/sign-up") }],
  }),
  component: SignUp,
});
