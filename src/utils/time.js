export const getStringTime = () => {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";

  const formattedHours = hours % 12 || 12;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedTime = `${amOrPm} ${formattedHours}:${formattedMinutes}`;

  return formattedTime;
};
