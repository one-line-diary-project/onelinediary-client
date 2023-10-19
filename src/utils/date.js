import moment from "moment-timezone";

export const getStringDate = (date, isEndDate) => {
  const currentDate = date ? new Date(date) : new Date();
  if (isEndDate) {
    currentDate.setDate(currentDate.getDate() + 1);
  }
  console.log(moment(currentDate));
  return moment(currentDate).format("YYYY.MM.DD");
};

export const getSearchDate = (date, isEndDate) => {
  const localDate = new Date(getStringDate(date, isEndDate));
  const utcTime = moment.utc(localDate).format();
  console.log(utcTime);
  return utcTime;
};
