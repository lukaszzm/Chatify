import { createFileRoute, redirect } from "@tanstack/react-router";

import { GradientContainer } from "@/features/landing/components/gradient-container";
import { Header } from "@/features/landing/components/header";
import { Hero } from "@/features/landing/components/hero";
import { matchPageTitle } from "@/utils/match-page-title";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: matchPageTitle("/") }],
  }),
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/chat",
      });
    }
  },
  component: Page,
});

function Page() {
  return (
    <GradientContainer>
      <Header />
      <Hero />
    </GradientContainer>
  );
}
