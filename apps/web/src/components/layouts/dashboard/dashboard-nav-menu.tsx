import { LayoutListIcon, MessageSquareMoreIcon, SettingsIcon } from "lucide-react";

import { DashboardLink } from "@/components/layouts/dashboard/dashboard-link";

export const DashboardNavMenu = () => {
  return (
    <nav
      aria-label="Navigation menu"
      className="flex w-3/4 justify-around  gap-4 md:w-auto md:flex-col"
    >
      <DashboardLink icon={<MessageSquareMoreIcon />} label="Chat" to="/chat" />
      <DashboardLink icon={<LayoutListIcon />} label="Notes" to="/notes" />
      <DashboardLink icon={<SettingsIcon />} label="Settings" to="/settings" />
    </nav>
  );
};
