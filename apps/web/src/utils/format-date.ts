import { formatDistance, isSameWeek, formatDate as format, isSameDay } from "date-fns";

export const formatDate = (timestamp: string) => {
  const now = new Date();

  if (isSameDay(timestamp, now)) {
    return formatDistance(timestamp, now, { addSuffix: true }).replace(
      "less than a minute ago",
      "just now"
    );
  }

  if (isSameWeek(timestamp, now)) {
    return format(timestamp, "cccc	kk:mm");
  }

  return format(timestamp, "dd.MM.yy, kk:mm");
};
