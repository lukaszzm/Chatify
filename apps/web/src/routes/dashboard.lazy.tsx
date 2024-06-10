import { Button, Logo } from "@chatify/ui";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

const Dashboard = () => {
  return (
    <div className="min-h-dvh flex flex-col justify-center items-center gap-4">
      <div className="flex gap-1 items-center">
        <Logo className="w-8" />
        <span className="font-semibold text-2xl">Chatify</span>
      </div>
      <h1 className="text-2xl">Hello from Dashboard Page</h1>
      <Button size="xl" asChild>
        <Link to="/">Go to Index</Link>
      </Button>
    </div>
  );
};

export const Route = createLazyFileRoute("/dashboard")({
  component: Dashboard,
});
