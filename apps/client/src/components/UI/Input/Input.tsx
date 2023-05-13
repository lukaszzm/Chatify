import React from "react";
import styles from "./Input.module.css";
import clsx from "clsx";
import { FieldError } from "react-hook-form";

interface InputProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  id?: string;
  type?: string;
  error?: FieldError;
  fullHeight?: boolean;
  autoComplete?: "off" | "on";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      autoComplete = "on",
      fullHeight,
      placeholder,
      onChange,
      value,
      error,
      id,
      type,
      ...rest
    },
    ref
  ) => {
    return (
      <div>
        <input
          id={id}
          type={type || "text"}
          placeholder={placeholder}
          onChange={onChange}
          className={clsx(
            `${styles.input}`,
            error && `${styles.error}`,
            fullHeight && `${styles["full-height"]}`
          )}
          value={value}
          ref={ref}
          autoComplete={autoComplete}
          {...rest}
        />
        {error && <p className={styles["error-message"]}>{error.message}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
