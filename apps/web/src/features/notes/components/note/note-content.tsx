import ContentEditable from "react-contenteditable";

import { useEditableContent } from "@/features/notes/hooks/use-editable-content";
import { useNote } from "@/features/notes/hooks/use-note";
import { useUpdateNote } from "@/features/notes/hooks/use-update-note";

export const NoteContent = () => {
  const { content: defaultContent, isLocked, id } = useNote();
  const { updateNote } = useUpdateNote();
  const { content, updateContent } = useEditableContent(defaultContent);

  const blurHandler = async () => {
    if (content.current === defaultContent) {
      return;
    }

    await updateNote(id, content.current);
  };

  return (
    <ContentEditable
      key={id}
      html={content.current}
      disabled={isLocked}
      onBlur={blurHandler}
      onChange={(e) => updateContent(e.target.value)}
      aria-placeholder={isLocked ? "No content" : "Write something..."}
      className="flex-1 p-2 empty:before:content-[attr(aria-placeholder)] before:text-muted-foreground/80 whitespace-pre-wrap overflow-auto"
    />
  );
};
