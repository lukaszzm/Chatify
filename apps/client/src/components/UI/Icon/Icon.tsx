import clsx from "clsx";
import styles from "./Icon.module.css";

interface IconProps {
  icon: string;
  alt: string;
  noColor?: boolean;
}
export const Icon = ({ icon, alt, noColor }: IconProps) => {
  return (
    <img
      className={clsx(`${styles.icon}`, noColor && `${styles["no-color"]}`)}
      src={icon}
      alt={alt}
    />
  );
};
