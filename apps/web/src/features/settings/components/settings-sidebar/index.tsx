import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarList,
  SidebarTitle,
} from "@chatify/ui";

import {
  SettingsSidebarItem,
  type SettingsSidebarItemProps,
} from "@/features/settings/components/settings-sidebar/item";

const settingsItems = [
  {
    name: "My Profile",
    to: "/settings/profile",
  },
  {
    name: "Notifications",
    to: "/settings/notifications",
  },
  {
    name: "Appearance",
    to: "/settings/appearance",
  },
] as const satisfies SettingsSidebarItemProps[];

export const SettingsSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarTitle>Settings</SidebarTitle>
      </SidebarHeader>
      <SidebarContent>
        <SidebarList>
          {settingsItems.map((item) => (
            <SettingsSidebarItem key={item.to} {...item} />
          ))}
        </SidebarList>
      </SidebarContent>
    </Sidebar>
  );
};
