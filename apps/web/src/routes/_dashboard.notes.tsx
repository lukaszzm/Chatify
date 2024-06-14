import { createFileRoute } from "@tanstack/react-router";

const Component = () => <h1>Hello from notes!</h1>;

export const Route = createFileRoute("/_dashboard/notes")({
  component: Component,
});
