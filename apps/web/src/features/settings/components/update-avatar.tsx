import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ImagePicker,
} from "@chatify/ui";

import { useUpdateAvatar } from "@/features/settings/hooks/use-update-avatar";

export const UpdateAvatar = () => {
  const { form, updateAvatar } = useUpdateAvatar();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="update-avatar-form"
            onSubmit={form.handleSubmit(updateAvatar)}
            className="grid grid-cols-1 gap-4 xl:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Picture Preview</FormLabel>
                  <FormControl>
                    <ImagePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-end">
        <Button form="update-avatar-form">Save</Button>
      </CardFooter>
    </Card>
  );
};
