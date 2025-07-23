import { SquareXIcon } from "lucide-react";

import { Container, type ContainerProps } from "@ui/components/container";
import { cn } from "@ui/lib/utils";

export interface NotFoundComponentProps extends ContainerProps {
  text?: string;
}

function NotFoundComponent({
  className,
  text = "Resource not found",
  ...props
}: NotFoundComponentProps) {
  return (
    <Container
      data-slot="not-found-component"
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

export { NotFoundComponent };
