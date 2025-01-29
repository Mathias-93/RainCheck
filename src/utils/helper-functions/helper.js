import { weatherQuotes } from "../data/data";

export function kilometersToMiles(km) {
  return (km * 0.621371).toFixed(2);
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "numeric",
  });
};

export const getRandomNumber = () => {
  const min = 0;
  const max = weatherQuotes.length;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
