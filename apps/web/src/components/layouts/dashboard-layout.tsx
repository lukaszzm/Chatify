import { Logo, TooltipButton } from "@chatify/ui";
import type { LinkProps } from "@tanstack/react-router";
import { Link, Outlet } from "@tanstack/react-router";
import { LayoutList, MessageSquareMore, Settings } from "lucide-react";

import { GraphQLTest } from "@/components/graphql-test";
import { SignOut } from "@/features/auth";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  to: LinkProps["to"];
};

const navItems = [
  { icon: <MessageSquareMore />, label: "Chat", to: "/" },
  { icon: <LayoutList />, label: "Notes", to: "/" },
  { icon: <Settings />, label: "Settings", to: "/" },
] as const satisfies NavItem[];

export const DashboardLayout = () => {
  return (
    <div className="min-h-dvh flex w-full p-4 gap-6 bg-muted/60">
      <aside className="bg-background rounded-md p-4 flex flex-col items-center gap-12">
        <Logo className="w-8" />
        <nav className="flex flex-col gap-4">
          {navItems.map(({ icon, label, to }) => (
            <TooltipButton key={label} tooltipText={label} asChild>
              <Link to={to}>{icon}</Link>
            </TooltipButton>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-background rounded-md p-4">
        <Outlet />
        <GraphQLTest />
        <SignOut />
      </main>
    </div>
  );
};
