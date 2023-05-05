import clsx from "clsx";
import styles from "./ProfileImage.module.css";

interface ProfileImageProps {
  src: string;
  large?: boolean;
  localFile?: boolean;
}

export const ProfileImage = ({ src, large, localFile }: ProfileImageProps) => {
  return (
    <div
      className={clsx(
        `${styles["image-container"]}`,
        large && `${styles.large}`
      )}
    >
      <img
        src={
          localFile
            ? `${src}`
            : `${import.meta.env.VITE_IMAGE_URL}${src}${
                import.meta.env.VITE_IMAGE_SUFFIX
              }`
        }
        alt="avatar"
      />
    </div>
  );
};
