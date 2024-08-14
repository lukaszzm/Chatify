import { Logo } from "@chatify/ui";
import { Outlet } from "@tanstack/react-router";

import { navLinks } from "@/components/layouts/dashboard/config";
import { DashboardLink } from "@/components/layouts/dashboard/dashboard-link";
import { SignOut, UserAvatar } from "@/features/auth";

export const DashboardLayout = () => (
  <div className="flex h-dvh w-full gap-6 overflow-auto p-4">
    <aside className="flex flex-col items-center gap-12 py-4">
      <Logo className="w-8" />
      <nav className="flex flex-col gap-4">
        {navLinks.map(({ Icon, label, to }) => (
          <DashboardLink key={label} label={label} to={to}>
            <Icon strokeWidth={2.35} />
          </DashboardLink>
        ))}
      </nav>

      <div className="mt-auto flex flex-col items-center gap-4">
        <UserAvatar />
        <SignOut />
      </div>
    </aside>

    <main className="flex flex-1 gap-6">
      <Outlet />
    </main>
  </div>
);
