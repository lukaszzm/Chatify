import { createFileRoute } from "@tanstack/react-router";

import { SignIn } from "@/features/auth/components/sign-in";
import { matchPageTitle } from "@/utils/match-page-title";

export const Route = createFileRoute("/_auth/sign-in")({
  head: () => ({
    meta: [{ title: matchPageTitle("/sign-in") }],
  }),
  component: SignIn,
});
