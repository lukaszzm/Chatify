import { Sidebar, SidebarContent, SidebarHeader, SidebarTitle } from "@chatify/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { SettingsList } from "@/features/settings/components/settings-list";
import { usePathname } from "@/hooks/use-pathname";

export const Route = createFileRoute("/_dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
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
