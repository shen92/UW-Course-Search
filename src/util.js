const parseTime = (timeStr) => {
  let times = timeStr.slice(0, -2).split(":");
  let hour = parseInt(times[0]);
  let minute = parseFloat(times[1]) / parseFloat(60);
  let converTime = hour + minute;
  if (hour !== 12 && timeStr.slice(-2) === "pm") {
    converTime += 12;
  }
  timeStr = converTime;

  return timeStr;
};

export const timeToNumber = (timeStr) => {
  const timeBlock = timeStr.split(" - ");
  const startTime = timeBlock[0];
  const endTime = timeBlock[1];

  return [parseTime(startTime), parseTime(endTime)];
};
