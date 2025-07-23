import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@ui/lib/utils";

const containerVariants = cva("flex w-full flex-col gap-4 rounded-md border p-4", {
  variants: {
    variant: {
      default: "border-card bg-card",
      ghost: "border-none bg-none",
      destructive: "border-destructive bg-destructive/5 text-destructive",
    },
    size: {
      sm: "w-full md:max-w-sm",
      full: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "full",
  },
});

interface ContainerProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof containerVariants> {}

function Container({ className, variant, size, ...props }: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(containerVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Container, containerVariants, type ContainerProps };
