import React from "react";

import { cn } from "@ui/lib/utils";

export const Title = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => {
  return (
    <h2 className={cn("text-2xl font-medium", className)} ref={ref} {...props}>
      {children}
    </h2>
  );
});
Title.displayName = "Title";
