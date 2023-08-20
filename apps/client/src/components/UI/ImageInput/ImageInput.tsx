import styles from "./ImageInput.module.css";
import { useState } from "react";
import { Icon, ProfileImage } from "..";
import React from "react";
import editIcon from "../../../assets/icons/edit.svg";
import clsx from "clsx";

interface ImageInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultImage?: string;
  id: string;
}

export const ImageInput = React.forwardRef<HTMLInputElement, ImageInputProps>(
  ({ id, onChange, defaultImage, ...rest }, ref) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    return (
      <div className={styles["input-container"]}>
        {selectedImage && <ProfileImage large src={URL.createObjectURL(selectedImage)} />}
        {defaultImage && !selectedImage && <ProfileImage large src={defaultImage} />}
        <label htmlFor={id} className={clsx(selectedImage || defaultImage ? `${styles.change}` : `${styles.add}`)}>
          {selectedImage || defaultImage ? <Icon noColor icon={editIcon} alt="" /> : "Click here to add Profile Image"}
        </label>
        <input
          id={id}
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          onChange={(event) => {
            if (event.target.files) {
              setSelectedImage(event.target.files[0]);
              onChange(event);
            }
          }}
          className={styles.input}
          ref={ref}
          {...rest}
        />
      </div>
    );
  },
);

ImageInput.displayName = "ImageInput";
