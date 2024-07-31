import {
  Button,
  Hybrid,
  HybridBody,
  HybridClose,
  HybridContent,
  HybridDescription,
  HybridFooter,
  HybridHeader,
  HybridTitle,
  HybridTrigger,
} from "@chatify/ui";
import { Plus } from "lucide-react";
import { useState } from "react";

import { NewNoteForm } from "@/features/notes/components/new-note/form";

export const NewNote = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Hybrid open={isOpen} onOpenChange={setIsOpen}>
      <HybridTrigger asChild>
        <Button variant="muted" className="gap-1">
          New Note
          <Plus />
        </Button>
      </HybridTrigger>
      <HybridContent className="sm:max-w-md">
        <HybridHeader>
          <HybridTitle>New Note</HybridTitle>
          <HybridDescription>
            Create a new note to keep track of your tasks.
          </HybridDescription>
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
