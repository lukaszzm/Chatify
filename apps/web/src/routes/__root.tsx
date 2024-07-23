import { Toaster } from "@chatify/ui";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import type { AuthContextValue } from "@/features/auth";

type RouterContext = {
  auth: AuthContextValue;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Page,
});

function Page() {
  return (
    <>
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </>
  );
}
