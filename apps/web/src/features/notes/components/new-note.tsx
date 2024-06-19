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

export const NewNote = () => {
  return (
    <Hybrid>
      <HybridTrigger asChild>
        <TooltipButton tooltipText="Add new note" variant="default" className="size-9">
          <Plus />
        </TooltipButton>
      </HybridTrigger>
      <HybridContent className="sm:max-w-md">
        <HybridHeader>
          <HybridTitle>New Note</HybridTitle>
        </HybridHeader>
        <HybridBody className="space-y-2">
          <p>NEW NOTE FORM</p>
        </HybridBody>
        <HybridFooter>
          <HybridClose asChild>
            <Button variant="outline">Close</Button>
          </HybridClose>
        </HybridFooter>
      </HybridContent>
    </Hybrid>
  );
};
