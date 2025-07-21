import type * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { type ButtonProps } from "@ui/components/button";
import { Button } from "@ui/components/button";
import { Container } from "@ui/components/container";
import { Title } from "@ui/components/title";
import { cn } from "@ui/lib/utils";

interface SidebarProps extends React.ComponentProps<"div"> {
  hideOnMobile?: boolean;
}

const Sidebar = ({ hideOnMobile, className, ref, ...props }: SidebarProps) => (
  <Container
    size="sm"
    ref={ref}
    className={cn(className, hideOnMobile && "hidden md:flex")}
    {...props}
  />
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = ({ className, ref, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("flex justify-between items-center", className)}
      ref={ref}
      {...props}
    />
  );
};
SidebarHeader.displayName = "SidebarHeader";

const SidebarTitle = ({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof Title>) => {
  return <Title className={className} ref={ref} {...props} />;
};
SidebarTitle.displayName = "SidebarTitle";

const SidebarContent = ({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) => {
  return <div ref={ref} className={cn("flex-1 overflow-auto", className)} {...props} />;
};
SidebarContent.displayName = "SidebarContent";

const SidebarList = ({ className, ref, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("space-y-2 p-1", className)} ref={ref} {...props} />;
};
SidebarList.displayName = "SidebarList";

const SidebarItem = ({ className, ref, ...props }: ButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="auto"
      className={cn(
        "w-full p-2 justify-start rounded-sm gap-2 hover:bg-muted/40",
        className
      )}
      ref={ref}
      {...props}
    />
  );
};
SidebarItem.displayName = "SidebarItem";

const SidebarInfo = ({ ref, ...props }: React.ComponentProps<"p">) => (
  <p className="py-2 text-center text-sm text-muted-foreground" ref={ref} {...props} />
);
SidebarInfo.displayName = "SidebarInfo";

export {
  Sidebar,
  SidebarHeader,
  SidebarTitle,
  SidebarContent,
  SidebarList,
  SidebarItem,
  SidebarInfo,
};
