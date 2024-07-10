import { createFileRoute, Outlet } from "@tanstack/react-router";

import { SettingsSidebar } from "@/features/settings";

export const Route = createFileRoute("/_dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <>
      <SettingsSidebar />
      <Outlet />
    </>
  );
}
