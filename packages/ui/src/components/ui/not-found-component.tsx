import { SquareXIcon } from "lucide-react";
import { forwardRef } from "react";

import { Container } from "@ui/components/ui/container";
import { cn } from "@ui/lib/utils";

export interface NotFoundComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

const NotFoundComponent = forwardRef<HTMLDivElement, NotFoundComponentProps>(
  ({ text = "Resource not found", className, ...props }, ref) => {
    return (
      <Container
        ref={ref}
        variant="ghost"
        className={cn("flex justify-center items-center", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-1">
          <SquareXIcon />
          <p className="text-base text-muted-foreground">{text}</p>
        </div>
      </Container>
    );
  }
);
NotFoundComponent.displayName = "NotFoundComponent";

export { NotFoundComponent };
