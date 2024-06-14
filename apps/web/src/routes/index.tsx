import { Button, Logo } from "@chatify/ui";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";

import { isAuthenticated } from "@/features/auth";

const Index = () => {
  return (
    <div className="min-h-dvh w-full flex flex-col justify-center items-center gap-4">
      <header className="w-full flex justify-between items-center py-4 px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Home page">
          <Logo className="w-12" />
          <span className="font-semibold text-3xl sr-only sm:not-sr-only">Chatify</span>
        </Link>
        <nav className="space-x-3">
          <Button size="lg" variant="outline" asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
          <Button size="lg" className="hidden sm:inline-flex" asChild>
            <Link to="/sign-up">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1 w-full p-4 flex justify-center items-center">
        <div className="max-w-5xl space-y-4 text-center p-4">
          <h1 className="text-5xl sm:text-6xl font-bold">
            Connect, Communicate, Collaborate
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground">
            Welcome to <span className="font-semibold text-accent">Chatify</span>, your
            ultimate destination for seamless communication.
          </p>
          <div>
            <Button size="xl" asChild>
              <Link to="/sign-up">Join the Community</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({
        to: "/chat",
      });
    }
  },
});
