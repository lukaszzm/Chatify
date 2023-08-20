import styles from "./Messages.module.css";
import { useEffect, useRef } from "react";
import { Message } from "../Message";
import { LoadingSpinner } from "../../../../components/UI";
import { useMessages } from "../../../../hooks/useMessages";
import { scrollToEnd } from "../../../../utils/scroll-to-end";
import { useAuthenticatedUser } from "../../../../hooks/useAuthenticatedUser";

interface MessagesProps {
  chatId: string;
}

export const Messages = ({ chatId }: MessagesProps) => {
  const { id } = useAuthenticatedUser();
  const messagesEnd = useRef<HTMLDivElement>(null);
  const { data, isLoading, isError } = useMessages(chatId);

  useEffect(() => {
    scrollToEnd(messagesEnd);
  }, [data]);

  return (
    <section className={styles.container}>
      <div className={styles["chat-box"]}>
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <p>Something went wrong!</p>
        ) : data.length === 0 ? (
          <p>You don&apos;t have any messages with this user yet.</p>
        ) : (
          data.map(({ text, fromId, createdAt }, index) => (
            <Message key={index} text={text} isMine={fromId === id} createdAt={createdAt} />
          ))
        )}
        <div ref={messagesEnd}></div>
      </div>
    </section>
  );
};
