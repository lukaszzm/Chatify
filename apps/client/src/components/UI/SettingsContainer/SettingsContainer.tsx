import styles from "./SettingsContainer.module.css";

interface SettingsContainerProps {
  children: React.ReactNode;
}

export const SettingsContainer = ({ children }: SettingsContainerProps) => {
  return <div className={styles.container}> {children} </div>;
};
