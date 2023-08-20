import clsx from "clsx";
import styles from "./ProfileImage.module.css";

interface ProfileImageProps {
  src: string;
  large?: boolean;
}

export const ProfileImage = ({ src, large }: ProfileImageProps) => {
  return (
    <div className={clsx(`${styles["image-container"]}`, large && `${styles.large}`)}>
      <img src={src} alt="avatar" />
    </div>
  );
};
