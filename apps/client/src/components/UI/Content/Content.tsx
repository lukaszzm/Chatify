import clsx from "clsx";
import styles from "./Content.module.css";

interface ContentProps {
  children: React.ReactNode;
  onLeft?: boolean;
}
export const Content = ({ children, onLeft }: ContentProps) => {
  return (
    <section
      className={clsx(`${styles.container}`, onLeft && `${styles.left}`)}
    >
      {children}
    </section>
  );
};
