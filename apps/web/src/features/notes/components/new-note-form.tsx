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

import { useNewNote } from "@/features/notes/hooks/use-new-note";

export const NewNoteForm = () => {
  const { form, onSubmit } = useNewNote();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-1 space-y-0">
              <FormLabel className="sr-only">Title</FormLabel>
              <FormControl>
                <Input placeholder="Todo list, docs..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};
