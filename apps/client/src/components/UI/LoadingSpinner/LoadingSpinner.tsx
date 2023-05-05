import clsx from "clsx";
import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  center?: boolean;
}

export const LoadingSpinner = ({ center }: LoadingSpinnerProps) => {
  return (
    <div className={clsx(`${styles.spinner}`, center && `${styles.centered}`)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
