import { Button, Toaster } from "@chatify/ui";
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import type { AuthContextValue } from "@/features/auth";

type RouterContext = {
  auth: AuthContextValue;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Page,
  notFoundComponent: NotFound,
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

function NotFound() {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center gap-6 px-4 py-12 pt-20">
      <span className="absolute top-0 my-4 text-2xl font-bold">Chatify</span>

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl font-semibold">This page does not exist</h1>
        <Button variant="muted" asChild>
          <Link to="/">Go back to home</Link>
        </Button>
      </div>
    </main>
  );
}
