import { Slot } from "@radix-ui/react-slot";

import { buttonVariants, type ButtonProps } from "@ui/components/button";
import {
  type TooltipContentProps,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/components/tooltip";
import { cn } from "@ui/lib/utils";

interface TooltipButtonProps extends ButtonProps {
  tooltipText: string;
  side?: TooltipContentProps["side"];
}

function TooltipButton({
  ref,
  asChild,
  tooltipText,
  side = "right",
  variant = "nav",
  size = "square",
  className,
  ...props
}: TooltipButtonProps) {
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
        <TooltipContent side={side} className="">
          {tooltipText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { TooltipButton };
