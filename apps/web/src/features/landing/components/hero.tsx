import { Badge, Button, Title } from "@chatify/ui";
import { Link } from "@tanstack/react-router";

import { AppPreview } from "@/features/landing/components/app-preview";

export const Hero = () => {
  return (
    <main className="flex size-full flex-1 flex-col justify-between gap-16 px-4 text-center text-accent-foreground">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Badge className="border-accent-foreground/30 bg-accent-foreground/10 text-accent-foreground hover:bg-accent-foreground/30">
          Open Source
        </Badge>
        <Title className="text-5xl font-bold sm:text-6xl">
          Connect, Communicate, Collaborate
        </Title>
        <p className="text-lg sm:text-xl">
          Welcome to <span className="font-bold">Chatify</span>, your ultimate destination
          for seamless communication.
        </p>
        <div>
          <Button size="xl" asChild variant="staticBlack">
            <Link to="/sign-up">Join the Community</Link>
          </Button>
        </div>
      </div>

      <AppPreview />
    </main>
  );
};
