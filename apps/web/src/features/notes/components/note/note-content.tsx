import { useNote } from "@/features/notes/hooks/use-note";
import { isEmpty } from "@/utils/is-empty";

export const NoteContent = () => {
  const { content, editable } = useNote();

  const fixedContent = !editable && isEmpty(content) ? "Empty content" : content;

  return (
    <div
      role="textbox"
      contentEditable={editable}
      aria-multiline="true"
      className="p-2 focus:outline-none flex-1"
      aria-label="Note content"
    >
      {fixedContent}
    </div>
  );
};
