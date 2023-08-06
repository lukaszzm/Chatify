import styles from "./NotesList.module.css";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import { Note } from "../Note";
import { NewNote } from "../NewNote";
import { useModal } from "../../../hooks/useModal";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../../api";
import { Sidebar, Container, Button, LoadingSpinner } from "../../../components/UI";
import type { Note as TNote } from "../../../interfaces/Note";

export const NotesList = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { noteId } = useParams();

  const { data, isLoading, isError } = useQuery<TNote[]>({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  return (
    <Sidebar>
      <div className={styles["top-sidebar"]}>
        <h1>Your notes</h1>
        <Button onClick={openModal}>Create new note</Button>
      </div>
      <Container>
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <p>Something went wrong. can&apos;t load your notes.</p>
        ) : data.length === 0 ? (
          <p>You don&apos;t have any notes yet.</p>
        ) : data.length > 0 ? (
          data.map(({ title, id }) => <Note key={id} id={id} title={title} isActive={noteId === id} />)
        ) : null}
      </Container>
      {isModalOpen
        ? ReactDOM.createPortal(<NewNote closeModal={closeModal} />, document.getElementById("modals") as HTMLElement)
        : null}
    </Sidebar>
  );
};
