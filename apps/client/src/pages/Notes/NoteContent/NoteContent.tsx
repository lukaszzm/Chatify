import styles from "./NoteContent.module.css";
import moment from "moment";

interface NoteContentProps {
  text: string;
  createdAt: string;
}

export const NoteContent = ({ text, createdAt }: NoteContentProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.date}>
        Created at {moment(createdAt).format("DD.MM.YYYY")}
      </p>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
