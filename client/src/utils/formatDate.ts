const calculateCreatedTime = (timeCreated: any) => {
  let periods: any = {
    year: 365 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };

  let diff = Date.now() - +new Date(`${timeCreated}`);

  for (const key in periods) {
    if (diff >= periods[key]) {
      let result = Math.floor(diff / periods[key]);
      return `${result} ${result === 1 ? key : key}`;
    }
  }

  return "Just now";
};

export default calculateCreatedTime;
