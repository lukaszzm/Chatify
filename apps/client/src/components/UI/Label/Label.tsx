import styles from "./Label.module.css";

interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
}

export const Label = ({ children, htmlFor }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {children}
    </label>
  );
};
