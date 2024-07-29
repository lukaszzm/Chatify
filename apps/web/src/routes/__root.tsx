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
    <main className="min-h-dvh w-full flex flex-col justify-center items-center gap-6 pt-20 px-4 py-12">
      <span className="absolute font-bold text-2xl top-0 my-4">Chatify</span>

      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-xl font-semibold">This page does not exist</h1>
        <Button variant="muted" asChild>
          <Link to="/">Go back to home</Link>
        </Button>
      </div>
    </main>
  );
}
