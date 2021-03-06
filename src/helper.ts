export const getWeekBoundaries = (date?: Date) => {
  const startEndDiff = 6;
  const curDate = date ? new Date(date) : new Date();
  const currentDay = curDate.getDay(); // day of week
  const firstDayAgo = currentDay === 0 ? 6 : (currentDay - 1);
  const firstDate = curDate.getDate() - firstDayAgo;
  const lastDate = firstDate + startEndDiff;

  const startDate = new Date(curDate.setDate(firstDate));
  const endDate = new Date(curDate.setDate(lastDate));

  return {
    startDate,
    endDate
  };
};

export const convertMeterToKm = (distance: string) => {
  const meterInKm = 1000;
  return `${(+distance / meterInKm).toFixed(2)}km`;
};

export const formatPrice = (price: string) => {
  const currency = 'PLN';
  return `${price}${currency}`;
};

const getOrdinalNumber = (number: number) => {
  const defaultEnding = 'th';
  const endNumber = number % 10;
  const ordinal = (number > 10 && number < 14) ? defaultEnding : {
    1: 'st',
    2: 'nd',
    3: 'rd'
  }[endNumber] || defaultEnding;

  return `${number}${ordinal}`;
};

export const formatDate = (dateValue: string) => {
  const date = new Date(dateValue);
  const monthName = date.toLocaleString('default', { month: 'long' });
  const ordinalNumber = getOrdinalNumber(date.getDate());

  return `${monthName}, ${ordinalNumber}`;
};