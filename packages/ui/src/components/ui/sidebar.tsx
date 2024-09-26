import type * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { forwardRef } from "react";

import type { ButtonProps } from "@ui/components/ui/button";
import { Button } from "@ui/components/ui/button";
import { Container } from "@ui/components/ui/container";
import { Title } from "@ui/components/ui/title";
import { cn } from "@ui/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  hideOnMobile?: boolean;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ hideOnMobile, className, ...props }, ref) => {
    return (
      <Container
        size="sm"
        ref={ref}
        className={cn(className, hideOnMobile && "hidden md:flex")}
        {...props}
      />
    );
  }
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("flex justify-between items-center", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";

const SidebarTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return <Title className={className} ref={ref} {...props} />;
});
SidebarTitle.displayName = "SidebarTitle";

const SidebarContent = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex-1 overflow-auto", className)} {...props} />;
});
SidebarContent.displayName = "SidebarContent";

const SidebarList = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("space-y-2 p-1", className)} ref={ref} {...props} />;
  }
);
SidebarList.displayName = "SidebarList";

const SidebarItem = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
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
  }
);
SidebarItem.displayName = "SidebarItem";

const SidebarInfo = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => (
  <p className="py-2 text-center text-sm text-muted-foreground" ref={ref} {...props} />
));
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
