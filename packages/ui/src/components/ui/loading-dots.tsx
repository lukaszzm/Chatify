import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@ui/lib/utils";

const loadingDotsVariants = cva("rounded-full animate-bounce", {
  variants: {
    size: {
      sm: "size-1.5",
      md: "size-2",
      lg: "size-3",
      xl: "size-5",
    },
    variant: {
      primary: "bg-primary",
      secondary: "bg-secondary",
      accent: "bg-accent",
      muted: "bg-muted",
      destructive: "bg-destructive",
    },
  },
  defaultVariants: {
    size: "sm",
    variant: "primary",
  },
});

export interface LoadingDotsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof loadingDotsVariants> {}

export const LoadingDots = forwardRef<HTMLDivElement, LoadingDotsProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <div
        className={cn("flex space-x-2 justify-center items-center", className)}
        ref={ref}
        {...props}
      >
        <span className="sr-only">Loading...</span>
        <div
          className={cn(
            loadingDotsVariants({ size, variant }),
            "[animation-delay:-0.3s]"
          )}
        />
        <div
          className={cn(
            loadingDotsVariants({ size, variant }),
            "[animation-delay:-0.15s]"
          )}
        />
        <div className={cn(loadingDotsVariants({ size, variant }))} />
      </div>
    );
  }
);

LoadingDots.displayName = "LoadingDots";
