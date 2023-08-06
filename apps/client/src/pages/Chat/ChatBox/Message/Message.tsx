import clsx from "clsx";
import { formatTime } from "../../../../utils/format-time";
import styles from "./Message.module.css";

interface MessageProps {
  isMine: boolean;
  text: string;
  createdAt: Date;
}

export const Message = ({ createdAt, isMine, text }: MessageProps) => {
  const formattedTime = formatTime(createdAt);

  return (
    <div
      data-time={formattedTime}
      className={clsx(`${styles.container}`, isMine ? `${styles.mine}` : `${styles["not-mine"]}`)}
    >
      <p className={styles.text}>{text}</p>
    </div>
  );
};
