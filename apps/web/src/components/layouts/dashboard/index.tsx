import { Logo } from "@chatify/ui";
import { Outlet } from "@tanstack/react-router";

import { navLinks } from "@/components/layouts/dashboard/config";
import { DashboardLink } from "@/components/layouts/dashboard/dashboard-link";
import { SignOut, UserAvatar } from "@/features/auth";

export const DashboardLayout = () => (
  <div className="h-dvh flex w-full p-4 gap-6 bg-secondary overflow-auto">
    <aside className="bg-background rounded-md p-4 flex flex-col items-center gap-12">
      <Logo className="w-8" />
      <nav className="flex flex-col gap-4">
        {navLinks.map(({ Icon, label, to }) => (
          <DashboardLink key={label} label={label} to={to}>
            <Icon />
          </DashboardLink>
        ))}
      </nav>

      <div className="flex flex-col gap-4 mt-auto items-center">
        <UserAvatar />
        <SignOut />
      </div>
    </aside>

    <main className="flex-1 flex gap-6">
      <Outlet />
    </main>
  </div>
);
