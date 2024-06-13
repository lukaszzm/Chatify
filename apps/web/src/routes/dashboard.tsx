import { createFileRoute, redirect } from "@tanstack/react-router";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { isAuthenticated } from "@/features/auth";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: "/",
      });
    }
  },
});
