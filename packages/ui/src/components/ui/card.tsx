import { cn } from "@ui/lib/utils";

const Card = ({ className, ref, ...props }: React.ComponentProps<"div">) => (
  <div
    ref={ref}
    className={cn(
      "rounded-md border border-border/60 bg-card text-card-foreground",
      className
    )}
    {...props}
  />
);
Card.displayName = "Card";

const CardHeader = ({ className, ref, ...props }: React.ComponentProps<"div">) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);
CardHeader.displayName = "CardHeader";

const CardTitle = ({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<"h3">) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  >
    {children}
  </h3>
);
CardTitle.displayName = "CardTitle";

const CardDescription = ({ className, ref, ...props }: React.ComponentProps<"p">) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
);
CardDescription.displayName = "CardDescription";

const CardContent = ({ className, ref, ...props }: React.ComponentProps<"div">) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
);
CardContent.displayName = "CardContent";

const CardFooter = ({ className, ref, ...props }: React.ComponentProps<"div">) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
