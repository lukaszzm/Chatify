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
import { useSendMessage } from "@/features/chat/hooks/use-send-message";

export const SendMessageForm = () => {
  const { id } = useChat();
  const { form, sendMessage, sending } = useSendMessage(id);

  return (
    <Form {...form}>
      <form
        onSubmit={sendMessage}
        className="flex h-20 items-start gap-2 border-t border-border px-4 pt-5"
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
