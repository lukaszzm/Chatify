import styles from "./NoteInfo.module.css";
import { NoteContent } from "../NoteContent";
import deleteIcon from "../../../assets/icons/delete.svg";
import { useQuery } from "@tanstack/react-query";
import { getNoteInfo } from "../../../api";
import { DeleteNote } from "../DeleteNote";
import { useModal } from "../../../hooks/useModal";
import * as ReactDOM from "react-dom";
import { Topbar, LoadingSpinner, Icon } from "../../../components/UI";

interface NoteInfoProps {
  noteId: string;
}

export const NoteInfo = ({ noteId }: NoteInfoProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getNoteInfo(noteId),
  });

  return isLoading ? (
    <LoadingSpinner center />
  ) : isError ? (
    <p>Something went wrong</p>
  ) : data ? (
    <>
      <Topbar backTo="/dashboard/notes">
        <h2>{data.title}</h2>
        <button onClick={openModal} className={styles["delete-button"]}>
          <Icon icon={deleteIcon} alt="delete" />
        </button>
      </Topbar>
      <NoteContent text={data.text} createdAt={data.createdAt} />
      {isModalOpen
        ? ReactDOM.createPortal(
            <DeleteNote noteId={noteId} closeModal={closeModal} />,
            document.getElementById("modals") as HTMLElement
          )
        : null}
    </>
  ) : null;
};
