import React from "react";
import styles from "./TextArea.module.css";
import clsx from "clsx";
import { FieldError } from "react-hook-form";

interface TextAreaProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  id?: string;
  error?: FieldError;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ placeholder, onChange, value, error, id, ...rest }, ref) => {
    return (
      <div>
        <textarea
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          className={clsx(`${styles.textarea}`, error && `${styles.error}`)}
          value={value}
          ref={ref}
          autoComplete="off"
          {...rest}
        />
        {error && <p className={styles["error-message"]}>{error.message}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
