import styles from "./NewMessage.module.css";
import sendIcon from "../../../../assets/icons/send.svg";
import { Input, Button } from "../../../../components/UI";
import { useNewMessage } from "../../../../hooks/useNewMessage";

interface NewMessageProps {
  chatID: string;
}

export const NewMessage = ({ chatID }: NewMessageProps) => {
  const { register, submitFn, isValid, isLoading, isDirty, isError } =
    useNewMessage(chatID);

  return (
    <div className={styles.wrapper}>
      {isError && (
        <p className={styles.error}>
          Something went wrong! This message has not been sent.
        </p>
      )}
      <form className={styles.form} onSubmit={submitFn}>
        <Input
          id="newMessage"
          placeholder="Enter you message..."
          {...register("text")}
          fullHeight
          autoComplete="off"
        />
        <Button disabled={!isValid || isLoading || !isDirty}>
          <img src={sendIcon} className={styles.icon} alt="Send Icon." />
        </Button>
      </form>
    </div>
  );
};
