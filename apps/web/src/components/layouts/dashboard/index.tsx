import { Logo } from "@chatify/ui";
import { Outlet } from "@tanstack/react-router";

import { navLinks } from "@/components/layouts/dashboard/config";
import { DashboardLink } from "@/components/layouts/dashboard/dashboard-link";
import { SignOut, CurrentUserAvatar } from "@/features/auth";

export const DashboardLayout = () => (
  <div className="flex h-dvh w-full flex-col-reverse gap-3 overflow-hidden p-2 md:flex-row md:gap-6 md:p-4">
    <aside className="flex items-center gap-4 md:flex-col md:gap-12 md:pt-4">
      <Logo className="hidden size-8 md:block" />
      <nav className="flex w-3/4 justify-around  gap-4 md:w-auto md:flex-col">
        {navLinks.map(({ Icon, label, to }) => (
          <DashboardLink key={label} label={label} to={to}>
            <Icon strokeWidth={2.35} />
          </DashboardLink>
        ))}
      </nav>

      <nav className="mt-auto flex w-1/4 items-center justify-around gap-4 md:w-auto md:flex-col">
        <CurrentUserAvatar />
        <SignOut />
      </nav>
    </aside>

    <main className="flex h-0 flex-1 gap-6 md:h-auto">
      <Outlet />
    </main>
  </div>
);
