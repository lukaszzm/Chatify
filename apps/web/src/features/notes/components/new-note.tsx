import {
  Button,
  Hybrid,
  HybridBody,
  HybridClose,
  HybridContent,
  HybridFooter,
  HybridHeader,
  HybridTitle,
  HybridTrigger,
  TooltipButton,
} from "@chatify/ui";
import { Plus } from "lucide-react";
import { useState } from "react";

import { NewNoteForm } from "@/features/notes/components/new-note-form";

export const NewNote = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Hybrid open={isOpen} onOpenChange={setIsOpen}>
      <HybridTrigger asChild>
        <TooltipButton tooltipText="Add new note" variant="default" className="size-9">
          <Plus />
        </TooltipButton>
      </HybridTrigger>
      <HybridContent className="sm:max-w-md">
        <HybridHeader>
          <HybridTitle>New Note</HybridTitle>
        </HybridHeader>
        <HybridBody>
          <NewNoteForm onNoteCreated={() => setIsOpen(false)} />
        </HybridBody>
        <HybridFooter>
          <HybridClose asChild>
            <Button variant="outline">Cancel</Button>
          </HybridClose>
        </HybridFooter>
      </HybridContent>
    </Hybrid>
  );
};
