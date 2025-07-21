import { cn } from "@ui/lib/utils";

const Skeleton = ({ className, ref, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      ref={ref}
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
};
Skeleton.displayName = "Skeleton";

export { Skeleton };
