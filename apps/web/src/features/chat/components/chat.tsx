import { Container } from "@chatify/ui";

import { ChatBox } from "@/features/chat/components/chat-box";
import { ChatHeader } from "@/features/chat/components/chat-header";
import { ChatNewMessage } from "@/features/chat/components/chat-new-message";

export const Chat = () => {
  return (
    <Container className="flex flex-col">
      <ChatHeader firstName="John" lastName="Smith" />
      <ChatBox />
      <ChatNewMessage />
    </Container>
  );
};
