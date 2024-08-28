import { Badge, Button } from "@chatify/ui";
import { Link } from "@tanstack/react-router";

import { AppPreview } from "@/features/landing/components/app-preview";

export const Hero = () => {
  return (
    <main className="flex size-full flex-1 flex-col justify-between gap-16 px-4 text-center">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Badge variant="muted">Open Source</Badge>
        <h1 className="text-5xl font-bold sm:text-6xl">
          Connect, Communicate, Collaborate
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl">
          Welcome to <span className="font-bold text-accent">Chatify</span>, your ultimate
          destination for seamless communication.
        </p>
        <div>
          <Button size="xl" asChild>
            <Link to="/sign-up">Join the Community</Link>
          </Button>
        </div>
      </div>

      <AppPreview />
    </main>
  );
};
