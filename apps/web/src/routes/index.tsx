import { createFileRoute, redirect } from "@tanstack/react-router";

import { GradientContainer, Header, Hero } from "@/features/landing";

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
