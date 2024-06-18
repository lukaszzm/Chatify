import { ChatBubble } from "@chatify/ui";

export const ChatBox = () => {
  return (
    <div className="p-4 space-y-2 flex-1">
      <ChatBubble isMine={true} createdAt="2 hours ago">
        That&apos;s awesome. I think our users will really appreciate the improvements.
      </ChatBubble>
      <ChatBubble createdAt="1 hour ago" firstName="John" lastName="Smith">
        I agree. The new design looks great.
      </ChatBubble>
      <ChatBubble isMine={true} createdAt="13 minutes ago">
        Thanks! I&apos;m glad you like it.
      </ChatBubble>
    </div>
  );
};
