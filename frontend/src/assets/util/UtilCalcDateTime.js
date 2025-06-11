const checkAMPM = hour => hour >= 12 ? `PM` : `AM`;
const hourIn12hFormat = hour => hour > 12 ? (hour - 12) : hour;

export function calcDateTime(isoString) {
  const dateString = new Date(isoString).toString();

  const month = dateString.slice(4, 7);
  const date = dateString.slice(8, 10);
  const year = dateString.slice(11, 15);
  const hour = parseInt(dateString.slice(16, 18));
  const minute = dateString.slice(19, 21);

  return `${date} ${month} ${year} at ${hourIn12hFormat(hour)}:${minute} ${checkAMPM(hour)}`;
}

// Wed Jun 04 2025 23:41:01 GMT+0600 (Bangladesh Standard Time)