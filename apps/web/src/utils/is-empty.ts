export function isEmpty(value?: string | null): boolean {
  return typeof value !== "string" || value === "";
}
