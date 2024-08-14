import { SidebarItem, SidebarList } from "@chatify/ui";
import { Link } from "@tanstack/react-router";
import { User, Bell, Eye } from "lucide-react";

export const SettingsList = () => {
  return (
    <SidebarList>
      <SidebarItem asChild>
        <Link
          to="/settings/profile"
          activeProps={{ className: "bg-muted/40" }}
          className="text-base font-semibold"
        >
          <User className="text-accent" />
          My Profile
        </Link>
      </SidebarItem>

      <SidebarItem asChild>
        <Link
          to="/settings/notifications"
          activeProps={{ className: "bg-muted/40" }}
          className="text-base font-semibold"
        >
          <Bell className="text-accent" />
          Notifications
        </Link>
      </SidebarItem>
      <SidebarItem asChild>
        <Link
          to="/settings/appearance"
          activeProps={{ className: "bg-muted/40" }}
          className="text-base font-semibold"
        >
          <Eye className="text-accent" />
          Appearance
        </Link>
      </SidebarItem>
    </SidebarList>
  );
};
