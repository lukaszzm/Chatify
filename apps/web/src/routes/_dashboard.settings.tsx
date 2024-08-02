import { Sidebar, SidebarContent, SidebarHeader, SidebarTitle } from "@chatify/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { SettingsList } from "@/features/settings";

export const Route = createFileRoute("/_dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <>
      <Sidebar>
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
