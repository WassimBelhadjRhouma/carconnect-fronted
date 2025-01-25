import dayjs from "dayjs";

export const getDatesInRange = (startDate, endDate) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate).add(1, "day");
  const dateArray = [];
  const test = start.add(1, "day");

  for (let date = start; !date.isSame(end, "day"); date = date.add(1, "day")) {
    dateArray.push(date.format("YYYY-MM-DD"));
  }

  return dateArray;
};
