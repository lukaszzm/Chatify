import { Link } from "react-router-dom";
import { Card } from "../../../components/UI";

interface NoteProps {
  isActive: boolean;
  title: string;
  id: string;
}

export const Note = ({ title, id, isActive }: NoteProps) => {
  return (
    <Link to={id}>
      <Card isActive={isActive}>{title}</Card>
    </Link>
  );
};
