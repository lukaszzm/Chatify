import styles from "./NoteContent.module.css";
import moment from "moment";
import { Icon, LoadingSpinner, Topbar } from "../../../components/UI";
import deleteIcon from "../../../assets/icons/delete.svg";
import { useModal } from "../../../hooks/useModal";
import ReactDOM from "react-dom";
import { DeleteNote } from "../DeleteNote";
import { useQuery } from "@tanstack/react-query";
import { getNoteInfo } from "../../../api/notes";

interface NoteContentProps {
  noteId: string;
}

export const NoteContent = ({ noteId }: NoteContentProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getNoteInfo(noteId),
  });

  if (isLoading) return <LoadingSpinner center />;

  if (isError) return <p>Something went wrong</p>;

  return (
    <>
      <Topbar backTo="/dashboard/notes">
        <h2>{data.title}</h2>
        <button onClick={openModal} className={styles["delete-button"]}>
          <Icon icon={deleteIcon} alt="delete" />
        </button>
      </Topbar>
      <div className={styles.container}>
        <p className={styles.date}>Created at {moment(data.createdAt).format("DD.MM.YYYY")}</p>
        <span className={styles.text}>{data.text}</span>
      </div>
      {isModalOpen
        ? ReactDOM.createPortal(
            <DeleteNote noteId={noteId} closeModal={closeModal} />,
            document.getElementById("modals") as HTMLElement,
          )
        : null}
    </>
  );
};
