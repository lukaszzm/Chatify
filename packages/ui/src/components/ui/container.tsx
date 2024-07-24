import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@ui/lib/utils";

const containerVariants = cva("rounded-md w-full space-y-4 p-4 border", {
  variants: {
    variant: {
      default: "border-card bg-card",
      ghost: "border-none bg-none",
      destructive: "border-destructive bg-destructive/5 text-destructive",
    },
    size: {
      sm: "w-full max-w-sm",
      full: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "full",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(containerVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";
