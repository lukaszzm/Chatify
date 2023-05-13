import { Modal, Alert } from "../../../components/UI";
import { useDeleteNote } from "../../../hooks/useDeleteNote";

interface DeleteNoteProps {
  noteId: string;
  closeModal: () => void;
}

export const DeleteNote = ({ noteId, closeModal }: DeleteNoteProps) => {
  const { mutate, isLoading, isError } = useDeleteNote();

  return (
    <Modal
      title="Delete Note"
      onConfirm={() => mutate(noteId)}
      isDisabledConfirm={isLoading}
      closeModal={closeModal}
    >
      <p>Are you sure are you want to delete this note</p>
      {isError && <Alert error>Something went wrong. Try again later.</Alert>}
    </Modal>
  );
};
