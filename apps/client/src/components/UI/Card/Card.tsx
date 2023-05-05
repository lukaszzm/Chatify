import clsx from "clsx";
import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  isActive?: boolean;
}

export const Card = ({ children, isActive }: CardProps) => {
  return (
    <div className={clsx(`${styles.wrapper}`, isActive && `${styles.active}`)}>
      {children}
    </div>
  );
};
