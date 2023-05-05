import styles from "./Button.module.css";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  outline?: boolean;
  disabled?: boolean;
  maxWidth?: string;
  form?: string;
  fullWidth?: boolean;
  size?: "sm" | "md";
}

export const Button = ({
  children,
  onClick,
  type,
  outline,
  disabled,
  maxWidth,
  form,
  fullWidth,
  size = "md",
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `${styles.button}`,
        outline && `${styles.outline}`,
        fullWidth && `${styles["full-width"]}`,
        size === "sm" && `${styles.small}`
      )}
      type={type || "submit"}
      style={{ maxWidth: maxWidth }}
      form={form}
    >
      {children}
    </button>
  );
};
