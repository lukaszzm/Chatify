import { Button, Logo } from "@chatify/ui";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexPage,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/chat",
      });
    }
  },
});

function IndexPage() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-4">
      <header className="flex w-full items-center justify-between p-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Home page">
          <Logo className="w-12" />
          <span className="sr-only text-3xl font-semibold sm:not-sr-only">Chatify</span>
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
      <main className="flex w-full flex-1 items-center justify-center p-4">
        <div className="max-w-5xl space-y-4 p-4 text-center">
          <h1 className="text-5xl font-bold sm:text-6xl">
            Connect, Communicate, Collaborate
          </h1>
          <p className="text-xl text-muted-foreground sm:text-2xl">
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
}
