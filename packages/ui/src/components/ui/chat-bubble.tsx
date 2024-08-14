import type React from "react";

import { Avatar, AvatarFallback } from "@ui/components/ui/avatar";
import { cn } from "@ui/lib/utils";

interface Sender {
  firstName: string;
  lastName: string;
}

interface ChatBubbleProps {
  isMine: boolean;
  sender: Sender;
  createdAt: string;
  children: React.ReactNode;
}

const ChatBubbleAvatar = ({ sender }: { sender: Sender }) => {
  return (
    <Avatar className="mt-4 size-8">
      <AvatarFallback className="text-xs">
        {sender.firstName.at(0)}
        {sender.lastName.at(0)}
      </AvatarFallback>
    </Avatar>
  );
};

export const ChatBubble = ({ isMine, sender, createdAt, children }: ChatBubbleProps) => {
  return (
    <div className={cn("flex items-start gap-2")}>
      {!isMine ? <ChatBubbleAvatar sender={sender} /> : null}

      <div
        className={cn(
          "flex flex-col w-full max-w-xs group relative gap-0.5",
          isMine && "ml-auto"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between space-x-2",
            isMine && "flex-row-reverse"
          )}
        >
          <span className={cn("text-sm font-medium px-2", isMine && "px-3")}>
            {isMine ? "You" : `${sender.firstName} ${sender.lastName}`}
          </span>
          <span className={cn("text-xs text-muted-foreground hidden group-hover:block")}>
            {createdAt}
          </span>
        </div>

        <div
          className={cn(
            "w-full px-3 py-1",
            isMine
              ? "bg-primary text-primary-foreground rounded-l-lg rounded-tr-lg"
              : "bg-muted/40 rounded-e-xl rounded-es-xl "
          )}
        >
          <p className="py-2.5 text-sm font-normal">{children}</p>
        </div>
      </div>
    </div>
  );
};
