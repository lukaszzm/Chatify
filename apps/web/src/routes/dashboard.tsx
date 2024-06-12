import { Logo } from "@chatify/ui";
import { createFileRoute, redirect } from "@tanstack/react-router";

import { GraphQLTest } from "@/components/graphql-test";
import { isAuthenticated, SignOut } from "@/features/auth";

const Dashboard = () => {
  return (
    <div className="min-h-dvh flex flex-col justify-center items-center gap-4">
      <div className="flex gap-1 items-center">
        <Logo className="w-8" />
        <span className="font-semibold text-2xl">Chatify</span>
      </div>
      <GraphQLTest />
      <SignOut />
    </div>
  );
};

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: "/",
      });
    }
  },
});
