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
          className="font-semibold text-base"
        >
          <User className="text-accent" />
          My Profile
        </Link>
      </SidebarItem>

      <SidebarItem asChild>
        <Link
          to="/settings/notifications"
          activeProps={{ className: "bg-muted/40" }}
          className="font-semibold text-base"
        >
          <Bell className="text-accent" />
          Notifications
        </Link>
      </SidebarItem>
      <SidebarItem asChild>
        <Link
          to="/settings/appearance"
          activeProps={{ className: "bg-muted/40" }}
          className="font-semibold text-base"
        >
          <Eye className="text-accent" />
          Appearance
        </Link>
      </SidebarItem>
    </SidebarList>
  );
};
