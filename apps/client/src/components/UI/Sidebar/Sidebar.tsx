import styles from "./Sidebar.module.css";

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  return <aside className={styles.sidebar}>{children}</aside>;
};
