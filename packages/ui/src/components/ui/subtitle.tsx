import React from "react";

import { cn } from "@ui/lib/utils";

export const Subtitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => {
  return (
    <h2 className={cn("text-xl font-medium", className)} ref={ref} {...props}>
      {children}
    </h2>
  );
});
Subtitle.displayName = "Subtitle";
