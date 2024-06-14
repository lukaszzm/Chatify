import { MessagePreview } from "@/features/chat/components/message-preview";

export const RecentMessages = () => {
  return (
    <ul className="space-y-2">
      <li>
        <MessagePreview
          firstName="John"
          lastName="Smith"
          createdAt="12:40"
          message="Hello, whats up?"
        />
      </li>
      <li>
        <MessagePreview
          firstName="Anna"
          lastName="Brown"
          createdAt="12:34"
          message="That's great to hear! I'm doing well too. Just planning out my weekend. Got any fun plans?"
        />
      </li>
    </ul>
  );
};
