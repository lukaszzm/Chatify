import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { buttonVariants, type ButtonProps } from "@ui/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/components/ui/tooltip";
import { cn } from "@ui/lib/utils";

interface TooltipButtonProps extends ButtonProps {
  tooltipText: string;
  side?: "top" | "right" | "bottom" | "left";
}

export const TooltipButton = forwardRef<HTMLButtonElement, TooltipButtonProps>(
  (
    {
      asChild,
      tooltipText,
      side = "right",
      variant = "ghost",
      size = "square",
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Comp
              className={cn(buttonVariants({ variant, size, className }))}
              ref={ref}
              {...props}
            />
          </TooltipTrigger>
          <TooltipContent side={side}>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

TooltipButton.displayName = "TooltipButton";
