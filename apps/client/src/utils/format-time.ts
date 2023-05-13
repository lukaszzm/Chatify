import * as _dayjs from "dayjs";

const dayjs = _dayjs;

export const formatTime = (timestamp: string | Date) => {
  const time = timestamp instanceof Date ? timestamp : new Date(timestamp);
  let formattedTime = "";

  if (dayjs().isSame(dayjs(time), "day")) {
    formattedTime = dayjs(time).format("H:mm");
  } else if (dayjs().isSame(dayjs(time), "year")) {
    formattedTime = dayjs(time).format("D/MM/YY");
  }

  return formattedTime;
};
