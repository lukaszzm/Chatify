import React from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Button, Logo } from "@chatify/ui";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index(): JSX.Element {
  return (
    <div className="min-h-dvh flex flex-col justify-center items-center gap-4">
      <div className="flex gap-1 items-center">
        <Logo className="w-8" />
        <span className="font-semibold text-2xl">Chatify</span>
      </div>
      <h1 className="text-2xl">Hello from Index Page</h1>
      <Button size="xl" asChild>
        <Link to="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
}
