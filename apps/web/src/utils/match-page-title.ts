import { pageTitles } from "@/config/page-titles";

const DEFAULT_TITLE = "Chatify";

export function matchPageTitle(pathname: string): string {
  const foundRecord = Object.entries(pageTitles).find(([key]) =>
    pathname.startsWith(key)
  );

  return foundRecord ? foundRecord[1] : DEFAULT_TITLE;
}
