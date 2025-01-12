import dayjs from "dayjs";

export const getDatesInRange = (startDate, endDate) => {
  const start = dayjs(startDate); // Convert to Day.js object
  const end = dayjs(endDate).add(1, "day"); // Convert to Day.js object
  const dateArray = [];
  const test = start.add(1, "day");

  for (let date = start; !date.isSame(end, "day"); date = date.add(1, "day")) {
    dateArray.push(date.format("YYYY-MM-DD")); // Format date and add to array
  }

  return dateArray;
};
