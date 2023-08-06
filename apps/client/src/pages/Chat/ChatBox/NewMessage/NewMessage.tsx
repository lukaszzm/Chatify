import styles from "./NewMessage.module.css";
import sendIcon from "../../../../assets/icons/send.svg";
import { Input, Button } from "../../../../components/UI";
import { useNewMessage } from "../../../../hooks/useNewMessage";

interface NewMessageProps {
  chatId: string;
}

export const NewMessage = ({ chatId }: NewMessageProps) => {
  const { register, submitFn, isValid, isDirty, isSubmitting, isSocketError } = useNewMessage(chatId);

  return (
    <div className={styles.wrapper}>
      {isSocketError && <p className={styles.error}>Something went wrong! This message has not been sent.</p>}
      <form className={styles.form} onSubmit={submitFn}>
        <Input id="newMessage" placeholder="Enter you message..." {...register("text")} fullHeight autoComplete="off" />
        <Button disabled={!isValid || isSubmitting || !isDirty}>
          <img src={sendIcon} className={styles.icon} alt="Send Icon." />
        </Button>
      </form>
    </div>
  );
};
