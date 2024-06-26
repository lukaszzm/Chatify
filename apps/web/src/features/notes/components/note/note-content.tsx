import { useNote } from "@/features/notes/hooks/use-note";
import { isEmpty } from "@/utils/is-empty";

export const NoteContent = () => {
  const { content } = useNote();

  const fixedContent = isEmpty(content) ? "No content" : content;

  return <div className="text-muted-foreground/80 truncate">{fixedContent}</div>;
};
