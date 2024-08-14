import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@ui/lib/utils";

const loadingDotsVariants = cva("animate-bounce rounded-full", {
  variants: {
    variant: {
      default: "bg-primary-foreground",
      destructive: "bg-destructive-foreground",
      outline: "bg-secondary-foreground",
      secondary: "bg-secondary-foreground",
      ghost: "bg-primary",
      link: "bg-accent",
      muted: "bg-accent",
      accent: "bg-accent-foreground",
      nav: "bg-primary",
      active: "bg-accent",
    },
    size: {
      default: "size-1.5",
      xs: "size-1",
      sm: "size-1.5",
      lg: "size-1.5",
      xl: "size-1.5",
      icon: "size-1",
      auto: "size-1",
      square: "size-1",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface LoadingDotsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof loadingDotsVariants> {}

export const LoadingDots = forwardRef<HTMLDivElement, LoadingDotsProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn("flex gap-1.5 justify-center items-center", className)}
        ref={ref}
        {...props}
      >
        <span className="sr-only">Loading...</span>
        <div
          className={cn(
            loadingDotsVariants({ variant, size }),
            "[animation-delay:-0.3s]"
          )}
        />
        <div
          className={cn(
            loadingDotsVariants({ variant, size }),
            "[animation-delay:-0.15s]"
          )}
        />
        <div className={cn(loadingDotsVariants({ variant, size }))} />
      </div>
    );
  }
);

LoadingDots.displayName = "LoadingDots";
