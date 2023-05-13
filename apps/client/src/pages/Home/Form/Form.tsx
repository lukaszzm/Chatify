import styles from "./Form.module.css";
import { Link } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { Logo } from "../../../components/UI";

interface FormProps {
  isLogin?: boolean;
}

export const Form = ({ isLogin }: FormProps) => {
  return (
    <div className={styles.container}>
      <Logo onlyMobile />
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <div className={styles.info}>
        {isLogin ? (
          <p>Don&apos;t have account?</p>
        ) : (
          <p>Already have an account?</p>
        )}
        <Link to={isLogin ? "/register" : "/"}>
          {isLogin ? "Click here to register" : "Click here to login"}
        </Link>
      </div>
    </div>
  );
};
