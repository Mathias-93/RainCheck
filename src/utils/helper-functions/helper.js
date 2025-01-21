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
