import { useEffect, useRef } from "react";

export const useEditableContent = (defaultContent: string) => {
  const content = useRef<string>(defaultContent);

  useEffect(() => {
    content.current = defaultContent;
  }, [defaultContent]);

  const updateContent = (newContent: string) => {
    content.current = newContent;
  };

  return {
    content,
    updateContent,
  };
};
