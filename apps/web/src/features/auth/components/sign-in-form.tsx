import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormMessage,
  Button,
  Separator,
} from "@chatify/ui";

import { ErrorAlert } from "@/components/error-alert";
import { AuthFooter } from "@/features/auth/components/auth-footer";
import { useSignIn } from "@/features/auth/hooks/use-sign-in";

export const SignInForm = () => {
  const { form, onSubmit, error } = useSignIn();
  const {
    formState: { isSubmitting },
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ErrorAlert error={error} />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Sign In
        </Button>
        <Separator />
        <AuthFooter variant="sign-in" onSwitch={() => {}} />
      </form>
    </Form>
  );
};
