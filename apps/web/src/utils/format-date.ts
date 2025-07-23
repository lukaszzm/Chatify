import { formatDistance, isSameWeek, formatDate as format, isSameDay } from "date-fns";

export function formatDate(timestamp: string): string {
  const now = new Date().toISOString();
  const time = new Date(timestamp).toISOString();

  if (isSameDay(time, now)) {
    return formatDistance(time, now, { addSuffix: true }).replace(
      "less than a minute ago",
      "just now"
    );
  }

  if (isSameWeek(time, now)) {
    return format(time, "cccc	kk:mm");
  }

  return format(time, "dd MMM yy, kk:mm");
}
