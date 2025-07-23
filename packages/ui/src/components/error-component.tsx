import { ServerCrashIcon } from "lucide-react";

import type { ContainerProps } from "@ui/components/container";
import { Container } from "@ui/components/container";
import { cn } from "@ui/lib/utils";

interface ErrorComponentProps extends ContainerProps {
  text?: string;
}

function ErrorComponent({
  className,
  text = "Something, went wrong, try again later",
  ...props
}: ErrorComponentProps) {
  return (
    <Container
      data-slot="error-component"
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

export { ErrorComponent, type ErrorComponentProps };
