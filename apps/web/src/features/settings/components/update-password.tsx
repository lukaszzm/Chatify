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
import { useUpdatePassword } from "@/features/settings/hooks/use-update-password";

export const UpdatePassword = () => {
  const { form, updatePassword, error } = useUpdatePassword();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password & Security</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="update-password-form"
            onSubmit={form.handleSubmit(updatePassword)}
            className="grid grid-cols-1 gap-4 xl:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
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
          form="update-password-form"
          aria-label="Save password"
          isLoading={form.formState.isSubmitting}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};
