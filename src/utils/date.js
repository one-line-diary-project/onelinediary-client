import moment from "moment-timezone";

export const getStringDate = (date, isEndDate) => {
  let currentDate;
  if (isEndDate) {
    currentDate = date ? new Date(date) : new Date();
    currentDate.setDate(currentDate.getDate() + 1);
  } else {
    currentDate = date ? new Date(date) : new Date();
  }

  return moment(currentDate).format("YYYY.MM.DD");
};

export const getSearchDate = (date, isEndDate) => {
  const localDate = date
    ? new Date(getStringDate(date, isEndDate))
    : new Date(getStringDate("", isEndDate));

  const utcTime = moment.utc(localDate).format();
  console.log(utcTime);
  return utcTime;
};
