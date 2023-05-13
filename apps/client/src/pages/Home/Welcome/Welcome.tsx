import styles from "./Welcome.module.css";
import textingImg from "../../../assets/texting.svg";

export const Welcome = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Talk with your friends on <span className={styles.logo}>Chatify.</span>
      </p>
      <img
        src={textingImg}
        alt="Man chatting with friend."
        className={styles.img}
      />
    </div>
  );
};
