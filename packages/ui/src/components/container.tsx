import { cn } from "@ui/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

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

const Container = ({ className, variant, size, ref, ...props }: ContainerProps) => {
  return (
    <div
      className={cn(containerVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
};
Container.displayName = "Container";

export { Container, containerVariants, type ContainerProps };
