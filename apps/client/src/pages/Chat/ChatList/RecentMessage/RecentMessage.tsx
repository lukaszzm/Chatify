import styles from "./RecentMessage.module.css";
import { Link } from "react-router-dom";
import { formatTime } from "../../../../utils/format-time";
import { ProfileImage, Card } from "../../../../components/UI";

interface RecentMessageProps {
  createdAt: Date;
  isActive: boolean;
  message: string;
  id: string;
  profileImage: string;
  fullName: string;
  isMine: boolean;
}

export const RecentMessage = ({
  createdAt,
  isActive,
  message,
  id,
  profileImage,
  fullName,
  isMine,
}: RecentMessageProps) => {
  const formattedMessage = message.length > 14 ? message.substring(0, 13) + ".." : message;

  return (
    <Link to={id}>
      <Card isActive={isActive}>
        <div className={styles["inner-wrapper"]}>
          <ProfileImage src={profileImage} />
          <div className={styles["text-wrapper"]}>
            <p className={styles.name}>{fullName}</p>
            <p className={styles.message}>
              {isMine && <span className={styles.span}>You: </span>} {formattedMessage}
            </p>
          </div>
        </div>
        <div className={styles["timer-wrapper"]}>
          <p className={styles.timer}>{formatTime(createdAt)}</p>
        </div>
      </Card>
    </Link>
  );
};
