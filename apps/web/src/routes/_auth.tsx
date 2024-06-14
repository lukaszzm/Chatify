import { createFileRoute, redirect } from "@tanstack/react-router";

import { AuthLayout } from "@/components/layouts/auth";
import { isAuthenticated } from "@/features/auth";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({
        to: "/chat",
      });
    }
  },
});
