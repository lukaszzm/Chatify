import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@chatify/ui";
import { Send } from "lucide-react";

import { useChat } from "@/features/chat/hooks/use-chat";
import { useNewMessage } from "@/features/chat/hooks/use-new-message";

export const ChatNewMessage = () => {
  const { id, bottomRef } = useChat();

  const { form, sendMessage, sending } = useNewMessage({
    chatId: id,
    onSend: () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={sendMessage}
        className="px-4 pt-5 border-t border-border flex items-start gap-2 h-24"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1 space-y-0">
              <FormLabel className="sr-only">Message</FormLabel>
              <FormControl>
                <Input placeholder="Enter your message..." {...field} className="h-12" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="accent" size="square" disabled={sending}>
          <Send />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </Form>
  );
};
