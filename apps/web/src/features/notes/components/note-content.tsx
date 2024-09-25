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
    <>
      <span id="note-content-label" className="sr-only">
        Note content
      </span>
      <ContentEditable
        key={id}
        html={content.current}
        disabled={isLocked}
        onBlur={blurHandler}
        onChange={(e) => updateContent(e.target.value)}
        role="textbox"
        aria-labelledby="note-content-label"
        aria-placeholder={isLocked ? "No content" : "Write something..."}
        className="flex-1 overflow-auto whitespace-pre-wrap p-2 before:text-muted-foreground empty:before:content-[attr(aria-placeholder)]"
      />
    </>
  );
};
