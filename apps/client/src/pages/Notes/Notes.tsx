import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { NotesList } from "./NotesList";
import { NoteBox } from "./NoteBox";
import { Content, Notification } from "../../components/UI";
import { ChatList } from "../Chat/ChatList";
import { ChatBox } from "../Chat/ChatBox";

export const Notes = () => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  const { noteId } = useParams();

  if (isMobile && noteId) return <NoteBox />;

  if (isMobile && !noteId) return <NotesList />;

  return (
    <>
      <NotesList /> <NoteBox />
    </>
  );
};
