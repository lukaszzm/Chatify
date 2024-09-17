import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@chatify/ui/main.css";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "urql";

import { AuthProvider } from "@/features/auth/contexts/auth-context";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { client } from "@/lib/gql/client";
import { routeTree } from "@/routeTree.gen";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <HelmetProvider>
      <Provider value={client}>
        <AuthProvider>
          <InnerApp />
        </AuthProvider>
      </Provider>
    </HelmetProvider>
  );
}

const el = document.getElementById("root");
if (el) {
  const root = createRoot(el);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  throw new Error("Could not find root element");
}
