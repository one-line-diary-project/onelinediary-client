import moment from "moment";

export const getStringDate = (date, isEndDate) => {
  const currentDate = date ? new Date(date) : new Date();
  if (isEndDate) {
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return moment(currentDate).format("YYYY.MM.DD");
};

export const getSearchDate = (date, isEndDate) => {
  const localDate = new Date(getStringDate(date, isEndDate));
  const utcTime = moment.utc(localDate).format();
  return utcTime;
};
