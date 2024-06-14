import { createFileRoute } from "@tanstack/react-router";

const Component = () => <h1>Hello from settings!</h1>;

export const Route = createFileRoute("/_dashboard/settings")({
  component: Component,
});
