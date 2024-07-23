import type * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import React from "react";

import type { ButtonProps } from "@ui/components/ui/button";
import { Button } from "@ui/components/ui/button";
import { Container } from "@ui/components/ui/container";
import { ScrollArea } from "@ui/components/ui/scroll-area";
import { cn } from "@ui/lib/utils";

const Sidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return <Container size="sm" ref={ref} {...props} />;
  }
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("flex justify-between items-center", className)}
      ref={ref}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => {
  return (
    <h1 className={cn("text-2xl", className)} ref={ref} {...props}>
      {children}
    </h1>
  );
});
SidebarTitle.displayName = "SidebarTitle";

const SidebarContent = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <ScrollArea
      className={cn("max-h-[calc(100dvh-7rem)]", className)}
      ref={ref}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

const SidebarList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div className={cn("space-y-2", className)} ref={ref} {...props} />;
});
SidebarList.displayName = "SidebarList";

const SidebarItem = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        variant="ghost"
        size="auto"
        className={cn(
          "p-3 rounded-sm justify-start items-center gap-2 w-full hover:bg-muted/40",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
SidebarItem.displayName = "SidebarItem";

const SidebarInfo = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  return (
    <p
      className="text-center text-muted-foreground/80 text-sm py-2"
      ref={ref}
      {...props}
    />
  );
});
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
