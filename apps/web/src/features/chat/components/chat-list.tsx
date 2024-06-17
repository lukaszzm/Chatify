import { ChatPreview } from "@/features/chat/components/chat-preview";

export const ChatList = () => {
  return (
    <div className="space-y-2">
      <ChatPreview
        firstName="John"
        lastName="Doe"
        createdAt="2 hours ago"
        message="Hey, how are you?"
      />
      <ChatPreview
        firstName="Peter"
        lastName="Crouch"
        createdAt="3 hours ago"
        message="I'm good, thanks for asking!"
      />
      <ChatPreview
        firstName="Adam"
        lastName="Brown"
        createdAt="4 hours ago"
        message="Do you have any plans for the weekend?"
      />
      <ChatPreview
        firstName="Anna"
        lastName="Smith"
        createdAt="5 hours ago"
        message="Not yet, I'm thinking of going to the beach."
      />
      <ChatPreview
        firstName="John"
        lastName="Doe"
        createdAt="6 hours ago"
        message="That sounds like a great idea!"
      />
    </div>
  );
};
