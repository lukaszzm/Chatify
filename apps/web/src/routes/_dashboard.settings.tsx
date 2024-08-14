import { createFileRoute, Outlet } from "@tanstack/react-router";

import { SettingsSidebar } from "@/features/settings";
import { useMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/_dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const isMobile = useMobile();

  if (isMobile) {
    return <Outlet />;
  }

  return (
    <>
      <SettingsSidebar />
      <Outlet />
    </>
  );
}
