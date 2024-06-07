import { Button } from "@chatify/ui";

type AuthFooterProps = {
  variant: "sign-in" | "sign-up";
  onSwitch: () => void;
};

export function AuthFooter({ variant, onSwitch }: AuthFooterProps) {
  const text =
    variant === "sign-in" ? "Don't have an account?" : "Already have an account?";
  const buttonText = variant === "sign-in" ? "Create an account" : "Sign in";

  return (
    <div className="flex justify-center items-center gap-2 text-muted-foreground text-sm">
      <p>{text}</p>
      <Button
        variant="link"
        size="auto"
        className="text-muted-foreground text-sm"
        onClick={onSwitch}
        type="button"
      >
        {buttonText}
      </Button>
    </div>
  );
}
