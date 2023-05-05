import styles from "./Switch.module.css";

interface SwitchProps {
  withLabels?: boolean;
  onChange: () => void;
  checked: boolean;
}

export const Switch = ({ withLabels, onChange, checked }: SwitchProps) => {
  return (
    <div className={`${styles["switch-wrapper"]}`}>
      {withLabels && <p className={styles.off}>OFF</p>}
      <label htmlFor="switch" className={styles.switch}>
        <input
          id="switch"
          type="checkbox"
          onChange={onChange}
          checked={checked}
        />
        <i></i>
      </label>
      {withLabels && <p className={styles.on}>ON</p>}
    </div>
  );
};
