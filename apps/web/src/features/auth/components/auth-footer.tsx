import { Button } from "@chatify/ui";
import type { LinkProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

interface AuthFooterProps {
  label?: string;
  linkText?: string;
  to?: LinkProps["to"];
}

export const AuthFooter = ({ label, linkText, to }: AuthFooterProps) => (
  <div className="flex items-center text-muted-foreground text-sm gap-2">
    <p>{label}</p>
    <Button variant="link" size="auto" asChild>
      <Link to={to}>{linkText}</Link>
    </Button>
  </div>
);
