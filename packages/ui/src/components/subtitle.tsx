import { cn } from "@ui/lib/utils";

const Subtitle = ({ children, className, ref, ...props }: React.ComponentProps<"h2">) => {
  return (
    <h2 className={cn("text-xl font-medium", className)} ref={ref} {...props}>
      {children}
    </h2>
  );
};
Subtitle.displayName = "Subtitle";

export { Subtitle };
