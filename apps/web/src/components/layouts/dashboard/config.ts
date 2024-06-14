import type { LinkProps } from "@tanstack/react-router";
import type { LucideProps } from "lucide-react";
import { LayoutList, MessageSquareMore, Settings } from "lucide-react";

type NavLink = {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  to: LinkProps["to"];
};

export const navLinks = [
  { Icon: MessageSquareMore, label: "Chat", to: "/chat" },
  { Icon: LayoutList, label: "Notes", to: "/notes" },
  { Icon: Settings, label: "Settings", to: "/settings" },
] as const satisfies NavLink[];
