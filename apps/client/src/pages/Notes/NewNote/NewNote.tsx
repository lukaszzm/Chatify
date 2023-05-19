import {
  Modal,
  Alert,
  LoadingSpinner,
  Label,
  Input,
} from "../../../components/UI";
import { useNewNote } from "../../../hooks/useNewNote";
import { TextArea } from "../../../components/UI/TextArea";

interface NewNoteProps {
  closeModal: () => void;
}

export const NewNote = ({ closeModal }: NewNoteProps) => {
  const {
    isLoading,
    isError,
    register,
    submitFn,
    formState: { errors },
  } = useNewNote({
    onSuccess: closeModal,
  });

  return (
    <Modal
      closeModal={closeModal}
      title="New Note"
      confirmLabel="Create Note"
      isDisabledConfirm={isLoading}
      form="newNote"
      onConfirm={submitFn}
    >
      <form>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Place your title here"
          {...register("title")}
          error={errors.title}
        />
        <Label htmlFor="text">Text</Label>
        <TextArea
          id="text"
          placeholder="Place your text here"
          {...register("text")}
          error={errors.text}
        />
      </form>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <Alert error>Something went wrong. Try again later.</Alert>
      ) : null}
    </Modal>
  );
};
