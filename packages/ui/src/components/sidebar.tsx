import type * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { type ButtonProps } from "@ui/components/button";
import { Button } from "@ui/components/button";
import { Container } from "@ui/components/container";
import { Title } from "@ui/components/title";
import { cn } from "@ui/lib/utils";

interface SidebarProps extends React.ComponentProps<"div"> {
  hideOnMobile?: boolean;
}

function Sidebar({ hideOnMobile, className, ref, ...props }: SidebarProps) {
  return (
    <Container
      size="sm"
      ref={ref}
      className={cn(className, hideOnMobile && "hidden md:flex")}
      {...props}
    />
  );
}

function SidebarHeader({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex justify-between items-center", className)}
      ref={ref}
      {...props}
    />
  );
}

function SidebarTitle({ className, ref, ...props }: React.ComponentProps<typeof Title>) {
  return <Title className={className} ref={ref} {...props} />;
}

function SidebarContent({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return <div ref={ref} className={cn("flex-1 overflow-auto", className)} {...props} />;
}

function SidebarList({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("space-y-2 p-1", className)} ref={ref} {...props} />;
}

function SidebarItem({ className, ref, ...props }: ButtonProps) {
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

function SidebarInfo({ ref, ...props }: React.ComponentProps<"p">) {
  return (
    <p className="py-2 text-center text-sm text-muted-foreground" ref={ref} {...props} />
  );
}

export {
  Sidebar,
  SidebarHeader,
  SidebarTitle,
  SidebarContent,
  SidebarList,
  SidebarItem,
  SidebarInfo,
};
