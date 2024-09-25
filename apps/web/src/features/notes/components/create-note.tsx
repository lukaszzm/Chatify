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

import { CreateNoteForm } from "@/features/notes/components/create-note-form";

export const CreateNote = () => {
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
          <CreateNoteForm onNoteCreated={() => setIsOpen(false)} />
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
