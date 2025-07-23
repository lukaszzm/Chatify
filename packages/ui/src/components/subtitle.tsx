import { cn } from "@ui/lib/utils";

function Subtitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="subtitle"
      className={cn("text-xl font-medium", className)}
      {...props}
    />
  );
}

export { Subtitle };
