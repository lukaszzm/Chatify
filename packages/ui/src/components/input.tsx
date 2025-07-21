import { cn } from "@ui/lib/utils";

type InputProps = React.ComponentProps<"input">;

const Input = ({ className, ref, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-input/30 bg-input/30 px-3 py-2 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
};
Input.displayName = "Input";

export { Input, type InputProps };
