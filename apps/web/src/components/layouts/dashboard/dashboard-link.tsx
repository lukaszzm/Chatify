import { TooltipButton } from "@chatify/ui";
import type { LinkProps } from "@tanstack/react-router";
import { Link, useLocation } from "@tanstack/react-router";

interface DashboardLinkProps {
  label: string;
  to: LinkProps["to"];
  icon: React.ReactNode;
}

export const DashboardLink = ({ icon, label, to }: DashboardLinkProps) => {
  const location = useLocation();
  const isActive = to && location.pathname.startsWith(to);

  return (
    <TooltipButton tooltipText={label} asChild variant={isActive ? "active" : "nav"}>
      <Link to={to}>
        {icon}
        <span className="sr-only">{label}</span>
      </Link>
    </TooltipButton>
  );
};
