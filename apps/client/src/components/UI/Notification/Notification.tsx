import styles from "./Notification.module.css";

interface NotificationProps {
  children: React.ReactNode;
}

export const Notification = ({ children }: NotificationProps) => {
  return <p className={styles.notification}> {children} </p>;
};
