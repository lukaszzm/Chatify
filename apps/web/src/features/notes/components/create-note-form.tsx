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

import { ErrorAlert } from "@/components/error-alert";
import { useCreateNote } from "@/features/notes/hooks/use-create-note";

interface CreateNoteFormProps {
  onNoteCreated?: () => void;
}

export const CreateNoteForm = ({ onNoteCreated }: CreateNoteFormProps) => {
  const { form, onSubmit, error } = useCreateNote({
    onSuccess: onNoteCreated,
  });
  const {
    formState: { isSubmitting },
  } = form;

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

        <ErrorAlert error={error} />

        <Button type="submit" isLoading={isSubmitting}>
          Create
        </Button>
      </form>
    </Form>
  );
};
