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

export const ChatBubble = ({ isMine, sender, createdAt, children }: ChatBubbleProps) => {
  return (
    <div className="flex items-start gap-2.5">
      {!isMine ? (
        <Avatar className="size-8">
          <AvatarFallback>
            {sender.firstName.at(0)}
            {sender.lastName.at(0)}
          </AvatarFallback>
        </Avatar>
      ) : null}
      <div
        className={cn(
          "flex flex-col w-full max-w-xs leading-0.5 p-3",
          isMine
            ? "rounded-l-lg rounded-tr-lg border-primary bg-primary text-primary-foreground ml-auto"
            : "rounded-e-xl rounded-es-xl border-muted/50 bg-muted/50"
        )}
      >
        <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold">
            {isMine ? "You" : `${sender.firstName} ${sender.lastName}`}
          </span>
          <span
            className={cn(
              "text-xs font-normal",
              isMine ? "text-primary-foreground/80" : "text-muted-foreground/80"
            )}
          >
            {createdAt}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5">{children}</p>
      </div>
    </div>
  );
};
