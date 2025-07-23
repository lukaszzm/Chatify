import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@ui/components/drawer";
import { useIsMobile } from "@ui/hooks/use-mobile";
import { cn } from "@ui/lib/utils";

interface BaseProps {
  children: React.ReactNode;
}

interface RootHybridProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface HybridProps extends BaseProps {
  className?: string;
  asChild?: boolean;
}

function Hybrid({ children, ...props }: RootHybridProps) {
  const isMobile = useIsMobile();
  const Hybrid = isMobile ? Drawer : Dialog;

  return <Hybrid {...props}>{children}</Hybrid>;
}

function HybridTrigger({ className, children, ...props }: HybridProps) {
  const isMobile = useIsMobile();
  const HybridTrigger = isMobile ? DrawerTrigger : DialogTrigger;

  return (
    <HybridTrigger className={className} {...props}>
      {children}
    </HybridTrigger>
  );
}

function HybridClose({ className, children, ...props }: HybridProps) {
  const isMobile = useIsMobile();
  const HybridClose = isMobile ? DrawerClose : DialogClose;

  return (
    <HybridClose className={cn(isMobile && "hidden", "w-full", className)} {...props}>
      {children}
    </HybridClose>
  );
}

function HybridContent({ className, children, ...props }: HybridProps) {
  const isMobile = useIsMobile();
  const HybridContent = isMobile ? DrawerContent : DialogContent;

  return (
    <HybridContent className={className} {...props}>
      {children}
    </HybridContent>
  );
}

function HybridDescription({ className, children, ...props }: HybridProps) {
  const isMobile = useIsMobile();
  const HybridDescription = isMobile ? DrawerDescription : DialogDescription;

  return (
    <HybridDescription className={className} {...props}>
      {children}
    </HybridDescription>
  );
}

function HybridHeader({ className, children, ...props }: HybridProps) {
  const isMobile = useIsMobile();
  const HybridHeader = isMobile ? DrawerHeader : DialogHeader;

  return (
    <HybridHeader className={className} {...props}>
      {children}
    </HybridHeader>
  );
}

function HybridTitle({ className, children, ...props }: HybridProps) {
  const isMobile = useIsMobile();
  const HybridTitle = isMobile ? DrawerTitle : DialogTitle;

  return (
    <HybridTitle className={className} {...props}>
      {children}
    </HybridTitle>
  );
}

function HybridBody({ className, children, ...props }: HybridProps) {
  return (
    <div className={cn("px-4 sm:px-0", className)} {...props}>
      {children}
    </div>
  );
}

function HybridFooter({ className, children, ...props }: HybridProps) {
  const isMobile = useIsMobile();
  const HybridFooter = isMobile ? DrawerFooter : DialogFooter;

  return (
    <HybridFooter className={className} {...props}>
      {children}
    </HybridFooter>
  );
}

export {
  Hybrid,
  HybridTrigger,
  HybridClose,
  HybridContent,
  HybridDescription,
  HybridHeader,
  HybridTitle,
  HybridBody,
  HybridFooter,
};
