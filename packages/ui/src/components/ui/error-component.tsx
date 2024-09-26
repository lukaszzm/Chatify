import { ServerCrashIcon } from "lucide-react";
import { forwardRef } from "react";

import { Container } from "@ui/components/ui/container";
import { cn } from "@ui/lib/utils";

export interface ErrorComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

const ErrorComponent = forwardRef<HTMLDivElement, ErrorComponentProps>(
  ({ text = "Something, went wrong, try again later", className, ...props }, ref) => {
    return (
      <Container
        ref={ref}
        variant="destructive"
        className={cn("flex justify-center items-center", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-1">
          <ServerCrashIcon />
          <p className="text-base">{text}</p>
        </div>
      </Container>
    );
  }
);
ErrorComponent.displayName = "ErrorComponent";

export { ErrorComponent };
