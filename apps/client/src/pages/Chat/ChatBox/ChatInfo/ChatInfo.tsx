import styles from "./ChatInfo.module.css";
import { LoadingImage, LoadingText, ProfileImage, Topbar } from "../../../../components/UI";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../../../api/users";

interface ChatInfoProps {
  chatId: string;
}

export const ChatInfo = ({ chatId }: ChatInfoProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["chat-info", chatId],
    queryFn: () => getUserInfo(chatId),
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
          <ProfileImage src={data.profileImage} />
          <p className={styles["user-text"]}>{data.fullName}</p>
        </div>
      )}
    </Topbar>
  );
};
