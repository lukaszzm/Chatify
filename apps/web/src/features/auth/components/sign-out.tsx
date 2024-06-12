import type { ButtonProps } from "@chatify/ui";
import { Button } from "@chatify/ui";
import { useNavigate } from "@tanstack/react-router";
import { forwardRef } from "react";

import { clearAuthTokens } from "@/features/auth/utils";

interface SignOutProps extends Omit<ButtonProps, "onClick" | "children"> {}

export const SignOut = forwardRef<HTMLButtonElement, SignOutProps>((props, ref) => {
  const navigate = useNavigate();

  const signOut = async () => {
    clearAuthTokens();
    await navigate({
      to: "/",
    });
  };

  return (
    <Button ref={ref} onClick={signOut} {...props}>
      Sign Out
    </Button>
  );
});

SignOut.displayName = "SignOut";
