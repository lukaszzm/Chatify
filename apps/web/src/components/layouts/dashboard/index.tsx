import { Logo } from "@chatify/ui";
import { Outlet } from "@tanstack/react-router";

import { DashboardNavMenu } from "@/components/layouts/dashboard/dashboard-nav-menu";
import { DashboardUserMenu } from "@/components/layouts/dashboard/dashboard-user-menu";

export const DashboardLayout = () => (
  <div className="flex h-dvh w-full flex-col-reverse gap-3 overflow-hidden p-2 md:flex-row md:gap-6 md:p-4">
    <aside className="flex items-center gap-4 md:flex-col md:gap-12 md:pt-4">
      <Logo className="hidden size-8 md:block" />
      <DashboardNavMenu />
      <DashboardUserMenu />
    </aside>

    <main className="flex h-0 flex-1 gap-6 md:h-auto">
      <Outlet />
    </main>
  </div>
);
