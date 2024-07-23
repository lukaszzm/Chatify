import { ServerCrash } from "lucide-react";
import type * as React from "react";

import { Container } from "@ui/components/ui/container";
import { cn } from "@ui/lib/utils";

export interface ErrorComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function ErrorComponent({
  text = "Something, went wrong, try again later",
  className,
  ...props
}: ErrorComponentProps) {
  return (
    <Container
      variant="destructive"
      className={cn("flex justify-center items-center", className)}
      {...props}
    >
      <div className="flex flex-col gap-1 items-center">
        <ServerCrash />
        <p className="text-base">{text}</p>
      </div>
    </Container>
  );
}
