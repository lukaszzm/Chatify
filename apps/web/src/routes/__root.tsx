import { ApolloProvider } from "@apollo/client";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { client } from "@/lib/gql";

export const Route = createRootRoute({
  component: () => (
    <ApolloProvider client={client}>
      <Outlet />
      <TanStackRouterDevtools />
    </ApolloProvider>
  ),
});
