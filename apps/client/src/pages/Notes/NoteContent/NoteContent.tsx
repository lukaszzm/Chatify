import styles from "./NoteContent.module.css";
import * as _dayjs from "dayjs";

const dayjs = _dayjs;

interface NoteContentProps {
  text: string;
  createdAt: string;
}

export const NoteContent = ({ text, createdAt }: NoteContentProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.date}>
        Created at {dayjs(createdAt).format("DD.MM.YYYY")}
      </p>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
