import { SidebarList, Skeleton } from "@chatify/ui";

export const RecentChatsLoading = () => {
  return (
    <SidebarList>
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
    </SidebarList>
  );
};
