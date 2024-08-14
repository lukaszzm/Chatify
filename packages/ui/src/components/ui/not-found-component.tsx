import { SquareX } from "lucide-react";
import type * as React from "react";

import { Container } from "@ui/components/ui/container";
import { cn } from "@ui/lib/utils";

export interface NotFoundComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function NotFoundComponent({
  text = "Resource not found",
  className,
  ...props
}: NotFoundComponentProps) {
  return (
    <Container
      variant="ghost"
      className={cn("flex justify-center items-center", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-1">
        <SquareX />
        <p className="text-base text-muted-foreground">{text}</p>
      </div>
    </Container>
  );
}
