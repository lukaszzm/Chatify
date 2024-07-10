import { SidebarItem } from "@chatify/ui";
import type { LinkProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export interface SettingsSidebarItemProps {
  name: string;
  to: LinkProps["to"];
}

export const SettingsSidebarItem = ({ name, to }: SettingsSidebarItemProps) => {
  return (
    <SidebarItem asChild>
      <Link
        to={to}
        activeProps={{ className: "bg-muted/40" }}
        className="font-semibold text-base"
      >
        {name}
      </Link>
    </SidebarItem>
  );
};
