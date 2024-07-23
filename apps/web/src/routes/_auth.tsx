import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

import { AuthLayout } from "@/components/layouts/auth";

export const Route = createFileRoute("/_auth")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: search.redirect || "/chat",
      });
    }
  },
  component: AuthLayout,
});
