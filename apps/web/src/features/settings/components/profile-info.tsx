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
  Input,
} from "@chatify/ui";

import { ErrorAlert } from "@/components/error-alert";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useUpdateProfile } from "@/features/settings/hooks/use-update-profile";

export const ProfileInfo = () => {
  const { user } = useAuth();

  const { form, updateProfile, error } = useUpdateProfile({
    defaultValues: user,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="update-profile-form"
            onSubmit={form.handleSubmit(updateProfile)}
            className="grid grid-cols-1 gap-4 xl:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="xl:col-span-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ErrorAlert error={error} className="xl:col-span-2" />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          form="update-profile-form"
          aria-label="Save personal information"
          isLoading={form.formState.isSubmitting}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};
