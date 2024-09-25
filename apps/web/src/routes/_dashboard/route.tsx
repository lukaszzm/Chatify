import { createFileRoute, redirect } from "@tanstack/react-router";

import { DashboardLayout } from "@/components/layouts/dashboard";

export const Route = createFileRoute("/_dashboard")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/sign-in",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
  component: DashboardLayout,
});
