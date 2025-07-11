import type { ButtonProps } from "@chatify/ui";
import { Button, cn } from "@chatify/ui";
import type { LinkProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";

interface MobileBackButtonProps extends Omit<ButtonProps, "children" | "asChild"> {
  to: LinkProps["to"];
}

export const MobileBackButton = ({
  to,
  className,
  ref,
  ...props
}: MobileBackButtonProps) => {
  return (
    <Button ref={ref} className={cn("block md:hidden", className)} {...props} asChild>
      <Link to={to}>
        <ChevronLeftIcon />
        <span className="sr-only">Back</span>
      </Link>
    </Button>
  );
};
MobileBackButton.displayName = "MobileBackButton";
