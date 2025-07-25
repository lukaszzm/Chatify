import { Sidebar, SidebarContent, SidebarHeader, SidebarTitle } from "@chatify/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { SettingsList } from "@/features/settings/components/settings-list";
import { usePathname } from "@/hooks/use-pathname";
import { matchPageTitle } from "@/utils/match-page-title";

export const Route = createFileRoute("/_dashboard/settings")({
  head: () => ({
    meta: [{ title: matchPageTitle("/settings") }],
  }),
  component: Page,
});

function Page() {
  const pathname = usePathname();

  return (
    <>
      <Sidebar hideOnMobile={pathname !== Route.fullPath}>
        <SidebarHeader>
          <SidebarTitle>Settings</SidebarTitle>
        </SidebarHeader>
        <SidebarContent>
          <SettingsList />
        </SidebarContent>
      </Sidebar>

      <Outlet />
    </>
  );
}
