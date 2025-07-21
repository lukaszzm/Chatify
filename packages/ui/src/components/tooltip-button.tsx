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

const TooltipButton = ({
  ref,
  asChild,
  tooltipText,
  side = "right",
  variant = "nav",
  size = "square",
  className,
  ...props
}: TooltipButtonProps) => {
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
};
TooltipButton.displayName = "TooltipButton";

export { TooltipButton };
