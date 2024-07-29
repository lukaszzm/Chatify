import { SidebarList, Skeleton } from "@chatify/ui";

export const RecentChatsLoading = () => {
  return (
    <SidebarList>
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-full h-14" />
    </SidebarList>
  );
};
