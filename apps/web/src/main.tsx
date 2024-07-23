import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@chatify/ui/main.css";
import { Provider } from "urql";

import { AuthProvider, useAuth } from "@/features/auth";
import { client } from "@/lib/gql";
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
    <Provider value={client}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </Provider>
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
