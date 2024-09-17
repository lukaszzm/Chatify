import { createFileRoute, redirect } from "@tanstack/react-router";

import { GradientContainer } from "@/features/landing/components/gradient-container";
import { Header } from "@/features/landing/components/header";
import { Hero } from "@/features/landing/components/hero";

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
    <GradientContainer>
      <Header />
      <Hero />
    </GradientContainer>
  );
}
