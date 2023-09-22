export const getStringDate = (date) => {
  const currentDate = date ? new Date(date) : new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1 필요)
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}.${month}.${day}`;
  return formattedDate;
};
