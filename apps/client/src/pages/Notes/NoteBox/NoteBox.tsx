import { NoteContent } from "../NoteContent";
import { Notification, Content } from "../../../components/UI";
import { useParams } from "react-router-dom";

export const NoteBox = () => {
  const { noteId } = useParams();

  return (
    <Content>
      {noteId ? (
        <NoteContent noteId={noteId} />
      ) : (
        <Notification>Select an existing note to see all the information.</Notification>
      )}
    </Content>
  );
};
