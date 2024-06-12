import { Alert, AlertDescription } from "@chatify/ui";
import type { CombinedError } from "urql";

import { extractErrorMessage } from "@/utils/extract-error-message";

interface ErrorAlertProps {
  error?: CombinedError;
  className?: string;
}

export const ErrorAlert = ({ error, className }: ErrorAlertProps) => {
  if (!error) {
    return null;
  }

  const message = extractErrorMessage(error.message);

  return (
    <Alert variant="destructive" className={className}>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
