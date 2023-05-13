import styles from "./ChatInfo.module.css";
import {
  LoadingImage,
  LoadingText,
  ProfileImage,
  Topbar,
} from "../../../../components/UI";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../../../api";

interface ChatInfoProps {
  chatID: string;
}

export const ChatInfo = ({ chatID }: ChatInfoProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["chat-info", chatID],
    queryFn: () => getUserInfo(chatID),
  });

  return (
    <Topbar backTo="/dashboard/chat">
      {isLoading ? (
        <div className={styles["user"]}>
          <LoadingImage />
          <LoadingText />
        </div>
      ) : isError ? (
        <p>Something went wrong.</p>
      ) : (
        <div className={styles["user"]}>
          <ProfileImage src={data[0].profileImage} />
          <p className={styles["user-text"]}>
            {`${data[0].firstName} ${data[0].lastName}`}
          </p>
        </div>
      )}
    </Topbar>
  );
};
