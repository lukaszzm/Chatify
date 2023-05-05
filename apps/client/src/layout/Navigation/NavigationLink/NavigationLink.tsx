import { Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Icon } from "../../../components/UI";

interface NavigationLinkProps {
  title: string;
  icon: string;
}

export const NavigationLink = ({ title, icon }: NavigationLinkProps) => {
  return (
    <Tooltip title={title} placement="right">
      <NavLink
        className={(navData) => (navData.isActive ? "active" : "")}
        to={title}
      >
        <Icon icon={icon} alt={title} />
      </NavLink>
    </Tooltip>
  );
};
