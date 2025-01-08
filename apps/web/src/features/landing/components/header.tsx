import { Button, Logo } from "@chatify/ui";
import { Link } from "@tanstack/react-router";

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between p-4 text-accent-foreground sm:px-8">
      <Link to="/" className="flex items-center gap-3" aria-label="Home page">
        <Logo className="w-12" />
        <span className="sr-only text-3xl font-semibold sm:not-sr-only">Chatify</span>
      </Link>
      <nav className="space-x-4">
        <Button size="lg" variant="staticGhost" asChild>
          <Link to="/sign-in">Sign in</Link>
        </Button>
        <Button size="lg" variant="staticBlack" className="hidden sm:inline-flex" asChild>
          <Link to="/sign-up">Get started</Link>
        </Button>
      </nav>
    </header>
  );
};
