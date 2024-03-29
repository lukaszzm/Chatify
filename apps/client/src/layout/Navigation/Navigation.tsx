import styles from "./Navigation.module.css";
import { useMatch } from "react-router-dom";
import logoIcon from "../../assets/logo.svg";
import chatIcon from "../../assets/icons/chat.svg";
import listIcon from "../../assets/icons/list.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import { useMediaQuery } from "react-responsive";
import ReactDOM from "react-dom";
import { useModal } from "../../hooks/useModal";
import { ProfileImage, Modal } from "../../components/UI";
import { NavigationLink } from "./NavigationLink";
import { NavigationButton } from "./NavigationButton";
import { useAuth } from "../../hooks/useAuth";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";

export const Navigation = () => {
  const isFirstNested = useMatch("dashboard/:id");
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  const { isModalOpen, openModal, closeModal } = useModal();
  const { logout } = useAuth();
  const { profileImage } = useAuthenticatedUser();

  return (
    <nav
      className={styles["navigation-panel"]}
      style={{ display: isMobile && !isFirstNested ? "none" : "flex" }}
    >
      <img src={logoIcon} className={styles.logo} alt="logo" />
      <div className={styles.links}>
        <NavigationLink title="chat" icon={chatIcon} />
        <NavigationLink title="notes" icon={listIcon} />
        <NavigationLink title="settings" icon={settingsIcon} />
        <NavigationButton
          title="logout"
          icon={logoutIcon}
          onClick={openModal}
          isMobile={true}
        />
      </div>
      <div className={styles.changers}>
        <ProfileImage src={profileImage} />
        <NavigationButton
          title="logout"
          icon={logoutIcon}
          onClick={openModal}
          isMobile={false}
        />
      </div>
      {isModalOpen &&
        ReactDOM.createPortal(
          <Modal closeModal={closeModal} title="Logout" onConfirm={logout}>
            <p>Are you sure are you want to sign out?</p>
          </Modal>,
          document.getElementById("modals") as HTMLElement
        )}
    </nav>
  );
};
