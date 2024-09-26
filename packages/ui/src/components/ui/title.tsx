import { forwardRef } from "react";

import { cn } from "@ui/lib/utils";

const Title = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <h1 className={cn("text-2xl font-medium", className)} ref={ref} {...props}>
        {children}
      </h1>
    );
  }
);
Title.displayName = "Title";

export { Title };
