const ERROR_REGEX = /^\[.*?\]\s*(.*)$/;

export function extractErrorMessage(error: string): string {
  const match = error.match(ERROR_REGEX);
  return match ? match[1] : error;
}
