import { createFileRoute } from "@tanstack/react-router";

const Component = () => <h1>Hello from chat!</h1>;

export const Route = createFileRoute("/_dashboard/chat")({
  component: Component,
});
