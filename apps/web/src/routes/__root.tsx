import { Button, Toaster } from "@chatify/ui";
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import type { AuthContextValue } from "@/features/auth/contexts/auth-context";

type RouterContext = {
  auth: AuthContextValue;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { title: "Chatify" },
      {
        name: "description",
        content:
          "Chatify - your ultimate destination for seamless communication. Connect, collaborate, and create with ease.",
      },
      { charSet: "UTF-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "msapplication-TileColor", content: "#4c51e1" },
      { name: "theme-color", content: "#f7f7f7" },
    ],
    links: [
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#4c51e1" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  component: Page,
  notFoundComponent: NotFound,
});

function Page() {
  return (
    <>
      <HeadContent />
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
        <p className="text-xl font-semibold">This page does not exist</p>
        <Button variant="muted" asChild>
          <Link to="/">Go back to home</Link>
        </Button>
      </div>
    </main>
  );
}
