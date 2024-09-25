import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ImagePicker,
} from "@chatify/ui";

import { ErrorAlert } from "@/components/error-alert";
import { useUpdateProfilePicture } from "@/features/settings/hooks/use-update-profile-picture";

export const UpdateProfilePicture = () => {
  const { form, updateProfilePicture, error } = useUpdateProfilePicture();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="update-picture-form"
            onSubmit={form.handleSubmit(updateProfilePicture)}
            className="space-y-4"
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
                  <FormDescription>
                    Submitting without selecting an image will remove your current profile
                    picture.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ErrorAlert error={error} />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          form="update-picture-form"
          aria-label="Save profile picture"
          isLoading={form.formState.isSubmitting}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};
