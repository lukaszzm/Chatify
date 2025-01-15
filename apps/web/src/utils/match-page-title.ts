import { pageTitles } from "@/config/page-titles";

const DEFAULT_TITLE = "Chatify";
const ROOT = "/";

export function matchPageTitle(pathname: string): string {
  if (pathname === ROOT) {
    return pageTitles[ROOT];
  }

  const result = Object.entries(pageTitles)
    .filter(([key]) => key !== ROOT)
    .find(([key]) => pathname.startsWith(key));

  return result ? result[1] : DEFAULT_TITLE;
}
