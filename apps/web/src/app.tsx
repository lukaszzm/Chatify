import React from "react";
import { Button } from "@chatify/ui";
import { Logo } from "./components/logo";

function App(): JSX.Element {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="flex justify-between pt-6 px-12">
        <a href="/" className="flex items-center gap-2">
          <Logo className="w-12" />
          <span className="font-semibold text-3xl">Chatify</span>
        </a>
        <nav className="space-x-2">
          <Button size="lg" variant="outline">
            Sign in
          </Button>
          <Button size="lg">Get started</Button>
        </nav>
      </header>
      <div className="flex-1 p-8 flex">
        <main className="flex-1 rounded-3xl bg-muted flex gap-6 p-12 items-center justify-start text-primary">
          <div className="w-full space-y-4">
            <h1 className="font-bold text-6xl lg:text-8xl">
              Chat with your <span className="text-accent">Friends</span>
            </h1>
            <p className="text-2xl text-primary/80">
              Keep the conversation going, no matter where you are.
            </p>
            <Button size="xl">Join the community</Button>
          </div>
          <div className="w-full p-12 h-full">
            <div className="rounded-3xl bg-accent h-full p-4" />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
