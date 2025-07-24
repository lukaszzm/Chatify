import { formatDistance, isSameWeek, formatDate as format, isSameDay } from "date-fns";

export function formatDate(timestamp: string): string {
  const now = new Date().toUTCString();
  const time = new Date(timestamp).toUTCString();

  if (isSameDay(time, now)) {
    return formatDistance(time, now, { addSuffix: true }).replace(
      "in 1 minute",
      "just now"
    );
  }

  if (isSameWeek(time, now)) {
    return format(time, "cccc	kk:mm");
  }

  return format(time, "dd MMM yy, kk:mm");
}
