import { TooltipButton } from "@chatify/ui";
import type { LinkProps } from "@tanstack/react-router";
import { Link, useLocation } from "@tanstack/react-router";

interface DashboardLinkProps {
  label: string;
  to: LinkProps["to"];
  children: React.ReactNode;
}

export const DashboardLink = ({ children, label, to }: DashboardLinkProps) => {
  const location = useLocation();
  const isActive = to && location.pathname.startsWith(to);

  return (
    <TooltipButton tooltipText={label} asChild variant={isActive ? "active" : "nav"}>
      <Link to={to}>{children}</Link>
    </TooltipButton>
  );
};
