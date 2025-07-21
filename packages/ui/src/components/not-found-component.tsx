import { Container, type ContainerProps } from "@ui/components/container";
import { cn } from "@ui/lib/utils";
import { SquareXIcon } from "lucide-react";

export interface NotFoundComponentProps extends ContainerProps {
  text?: string;
}

const NotFoundComponent = ({
  ref,
  className,
  text = "Resource not found",
  ...props
}: NotFoundComponentProps) => {
  return (
    <Container
      ref={ref}
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
};
NotFoundComponent.displayName = "NotFoundComponent";

export { NotFoundComponent };
