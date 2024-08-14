import type { LinkProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import type { ButtonProps } from "@ui/index";
import { Button, cn } from "@ui/index";
import { ChevronLeft } from "lucide-react";
import React from "react";

interface BackButtonProps extends Omit<ButtonProps, "children" | "asChild"> {
  to: LinkProps["to"];
}

export const BackButton = React.forwardRef<HTMLButtonElement, BackButtonProps>(
  ({ to, className, ...props }, ref) => {
    return (
      <Button ref={ref} className={cn("block md:hidden", className)} {...props} asChild>
        <Link to={to}>
          <ChevronLeft />
          <span className="sr-only">Back</span>
        </Link>
      </Button>
    );
  }
);
BackButton.displayName = "BackButton";
