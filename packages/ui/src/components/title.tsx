import { cn } from "@ui/lib/utils";

function Title({ children, className, ref, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1 className={cn("text-2xl font-medium", className)} ref={ref} {...props}>
      {children}
    </h1>
  );
}

export { Title };
