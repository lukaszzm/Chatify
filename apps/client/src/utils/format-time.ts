import moment from "moment";

export const formatTime = (time: Date) => {
  let formattedTime = "";

  if (moment().isSame(moment(time), "day")) {
    formattedTime = moment(time).format("H:mm");
  } else if (moment().isSame(moment(time), "year")) {
    formattedTime = moment(time).format("D/MM/YY");
  }

  return formattedTime;
};
